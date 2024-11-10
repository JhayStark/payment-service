const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const dbConnect = require('./config/dbConnect');
const PaymentRouter = require('./api/routes');
const authRouter = require('./auth/routes');
const { verifyToken } = require('./config/jwt');

dotenv.config();
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/payment', verifyToken, PaymentRouter);

(async function start() {
  await dbConnect();
  app.listen(port, () => {
    console.log(`Server is running on:${port}`);
  });
})();
