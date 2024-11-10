const PaymentRouter = require('express').Router();
const {
  initiateMomoCharge,
  confirmOTP,
  confirmPaymentByReference,
} = require('./controller');

PaymentRouter.post('/momo-pay', initiateMomoCharge);
PaymentRouter.post('/confirm-otp', confirmOTP);
PaymentRouter.get('/confirm-payment', confirmPaymentByReference);

module.exports = PaymentRouter;
