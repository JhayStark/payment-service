const { createAccessToken } = require('../config/jwt');
const { addNewBackendService } = require('./service');

const addBackend = async (req, res) => {
  try {
    const { data, password } = req.body;
    if (password.toString() !== process.env.PASSWORD.toString()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const response = await addNewBackendService(data);
    const token = createAccessToken({
      id: response._id.toString(),
      name: response.name,
      callbackurl: response.callbackurl,
      webhookurl: response.webhookurl,
    });
    res.status(201).json({ message: 'Backend added successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addBackend,
};
