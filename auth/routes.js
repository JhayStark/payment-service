const authRouter = require('express').Router();
const { addBackend, updateBackendService } = require('./controller');
const { authenticateKey } = require('./middleware');

authRouter.post('/add-backend', addBackend);
authRouter.patch('/update-backend', authenticateKey, updateBackendService);

module.exports = authRouter;
