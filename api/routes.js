const PaymentRouter = require("express").Router();
const {
  initiateMomoCharge,
  confirmOTP,
  confirmPaymentByReference,
  initiateWithdrawal,
  confirmAccountNumber,
  getBanksData,
} = require("./controller");

PaymentRouter.post("/momo-pay", initiateMomoCharge);
PaymentRouter.post("/confirm-otp", confirmOTP);
PaymentRouter.get("/confirm-payment", confirmPaymentByReference);
PaymentRouter.post("/withdraw", initiateWithdrawal);
PaymentRouter.post("/confirm-account", confirmAccountNumber);
PaymentRouter.get("/banks", getBanksData);
PaymentRouter.post("/checkout", getCheckoutUrl);

module.exports = PaymentRouter;
