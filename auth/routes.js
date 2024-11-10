const authRouter = require('express').Router();
const { addBackend } = require('./controller');

authRouter.post('/add-backend', addBackend);

module.exports = authRouter;
