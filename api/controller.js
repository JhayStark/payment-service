const {
  chargeUser,
  createTransferRecipient,
  initiateTransfer,
  sentdOTP,
  confirmPayment,
} = require('../paystack/service');

const { createNewReceipt, updateReceipt } = require('../receipts/service');

const initiateMomoCharge = async (req, res) => {
  try {
    const { email, amount, currency, mobile_money } = req.body;
    const data = {
      email,
      amount,
      currency,
      mobile_money,
    };
    const response = await chargeUser(data);
    const receipt = {
      service: req.backendService.id,
      reference: response.data.data.reference,
      amount,
      status: response.data.data.status,
      accountCharged: mobile_money.phone,
      transactionType: 'momo-pay',
    };
    await createNewReceipt(receipt);
    //create a receipt
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const confirmOTP = async (req, res) => {
  try {
    const { reference, otp } = req.body;
    const data = {
      reference,
      otp,
    };
    const response = await sentdOTP(data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmPaymentByReference = async (req, res) => {
  try {
    const { reference } = req.query;
    const response = await confirmPayment(reference);
    await updateReceipt(reference, {
      status: response.data.data.status,
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const initiateWithdrawal = async (req, res) => {
  try {
    const { type, name, account_number, bank_code, currency, amount, reason } =
      req.body;
    const data = {
      type,
      name,
      account_number,
      bank_code,
      currency,
    };
    const response = await createTransferRecipient(data);
    const transferData = {
      source: 'balance',
      amount,
      recipient: response.data.data.recipient_code,
      reason,
    };

    const transferResponse = await initiateTransfer(transferData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  initiateMomoCharge,
  confirmOTP,
  initiateWithdrawal,
  confirmPaymentByReference,
};
