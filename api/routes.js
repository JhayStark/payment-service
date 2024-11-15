const PaymentRouter = require('express').Router();
const {
  initiateMomoCharge,
  confirmOTP,
  confirmPaymentByReference,
  initiateWithdrawal,
  confirmAccountNumber,
} = require('./controller');

PaymentRouter.post('/momo-pay', initiateMomoCharge);
PaymentRouter.post('/confirm-otp', confirmOTP);
PaymentRouter.get('/confirm-payment', confirmPaymentByReference);
PaymentRouter.post('/withdraw', initiateWithdrawal);
PaymentRouter.post('/confirm-account', confirmAccountNumber);

module.exports = PaymentRouter;
