const {
  addNewBackendService,
  updateBackendService,
  getBackendServiceById,
} = require('./service');
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

function generateApiKey(length = 32) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let apiKey = '';
  for (let i = 0; i < length; i++) {
    apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return apiKey;
}

const addBackend = async (req, res) => {
  try {
    const { data, password } = req.body;
    if (password.toString() !== process.env.PASSWORD.toString()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const apiKey = generateApiKey();
    const encryptedKey = await bcrypt.hash(apiKey, SALT_ROUNDS);
    await addNewBackendService({
      ...data,
      apiKey: encryptedKey,
    });
    res.status(201).json({ message: 'Backend added successfully', apiKey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBackendServices = async (req, res) => {
  try {
    const id = req.backendService._id.toString();
    await updateBackendService(id, req.body);
    res.status(200).json({ message: 'Backend updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBackendService = async (req, res) => {
  try {
    const id = req.backendService._id.toString();
    const backendService = await getBackendServiceById(id);
    res.status(200).json(backendService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addBackend,
  updateBackendServices,
  getBackendService,
};
