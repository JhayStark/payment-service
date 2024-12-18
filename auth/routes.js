const authRouter = require('express').Router();
const {
  addBackend,
  updateBackendServices,
  getBackendService,
} = require('./controller');
const { authenticateKey } = require('./middleware');

authRouter.post('/add-backend', addBackend);
authRouter.patch('/update-backend', authenticateKey, updateBackendServices);
authRouter.get('/get-backend', authenticateKey, getBackendService);

module.exports = authRouter;
