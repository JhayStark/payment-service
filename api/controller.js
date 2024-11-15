const {
  chargeUser,
  createTransferRecipient,
  initiateTransfer,
  sendOTP,
  confirmPayment,
} = require('../paystack/service');
const {
  createNewReceipt,
  updateReceipt,
  getReceiptByReference,
} = require('../receipts/service');
const {
  createNewRecipient,
  getRecipientByAccountNumber,
} = require('../recipient/service');
const { getBackendServiceById } = require('../auth/service');

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
      service: req.backendService._id.toString(),
      reference: response.data.data.reference,
      amount,
      status: response.data.data.status,
      accountCharged: mobile_money.phone,
      transactionType: 'momo-pay',
    };
    await createNewReceipt(receipt);
    res.status(200).json(response.data);
  } catch (error) {
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
    const response = await sendOTP(data);
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
    const {
      type,
      name,
      account_number,
      bank_code,
      currency,
      amount,
      reason,
      transactionType,
    } = req.body;
    const data = {
      type,
      name,
      account_number,
      bank_code,
      currency,
    };
    let recipient = {};
    const existingRecipient = await getRecipientByAccountNumber(account_number);
    console.log(existingRecipient);
    if (!existingRecipient) {
      const response = await createTransferRecipient(data);
      console.log(response.data);
      recipient = {
        recipientCode: response.data.data.recipient_code,
        name,
        type,
        accountNumber: response.data.data.details.account_number,
        bankCode: response.data.data.details.bank_code,
      };
      await createNewRecipient(recipient);
    } else {
      recipient = existingRecipient;
    }
    if (!recipient.recipientCode) {
      return res.status(400).json({ error: 'Failed to create recipient' });
    }
    const transferData = {
      source: 'balance',
      amount,
      recipient: recipient.recipientCode,
      reason,
      reference: Math.floor(Math.random() * 1000000000).toString(),
    };

    const transferResponse = await initiateTransfer(transferData);
    const receipt = {
      service: req.backendService.id,
      reference: transferData.reference,
      amount,
      status: transferResponse.data.data.status,
      accountCharged: account_number,
      transactionType,
    };
    await createNewReceipt(receipt);
    res.status(200).json(transferResponse.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const webhook = async (req, res) => {
  try {
    const reference = req.body.data.reference;
    const receipt = await getReceiptByReference(reference);
    if (receipt) {
      await updateReceipt(reference, {
        status: req.body.data.status,
      });
      const backendService = await getBackendServiceById(receipt.service);
      if (backendService.webhookUrl) {
        await fetch(backendService.webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
      }
    }
    res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  initiateMomoCharge,
  confirmOTP,
  initiateWithdrawal,
  confirmPaymentByReference,
  webhook,
};
