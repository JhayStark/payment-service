const authRouter = require('express').Router();
const { addBackend, updateBackendServices } = require('./controller');
const { authenticateKey } = require('./middleware');

authRouter.post('/add-backend', addBackend);
authRouter.patch('/update-backend', authenticateKey, updateBackendServices);

module.exports = authRouter;
