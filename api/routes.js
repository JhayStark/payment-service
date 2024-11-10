const PaymentRouter = require('express').Router();
const {
  initiateMomoCharge,
  confirmOTP,
  confirmPaymentByReference,
  initiateWithdrawal,
} = require('./controller');

PaymentRouter.post('/momo-pay', initiateMomoCharge);
PaymentRouter.post('/confirm-otp', confirmOTP);
PaymentRouter.get('/confirm-payment', confirmPaymentByReference);
PaymentRouter.post('/withdraw', initiateWithdrawal);

module.exports = PaymentRouter;
