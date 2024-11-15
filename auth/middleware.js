const BackendService = require('./model');
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

const authenticateKey = async (req, res, next) => {
  const apiKey = req.headers['api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Retrieve all active backend services
  const activeServices = await BackendService.find({ status: 'active' });

  if (!activeServices || activeServices.length === 0) {
    return res
      .status(401)
      .json({ error: 'Unauthorized: No active services found' });
  }

  // Compare the provided API key with the stored hashes
  let matchedService = null;

  for (const service of activeServices) {
    const isValidKey = await bcrypt.compare(apiKey, service.apiKey);
    if (isValidKey) {
      matchedService = service;
      break;
    }
  }

  if (!matchedService) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
  }

  // Attach the matched service to the request for later use
  req.backendService = matchedService.toObject();
  delete req.backendService.apiKey;

  next();
};

module.exports = {
  authenticateKey,
};
