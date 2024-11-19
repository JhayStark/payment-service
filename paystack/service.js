const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Create an axios instance with the base URL and common headers
const paystackInstance = axios.create({
  baseURL: process.env.PAYSTACK_URL,
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Function to charge a user
const chargeUser = async data => paystackInstance.post('/charge', data);

// Function to create a transfer recipient
const createTransferRecipient = async data =>
  paystackInstance.post('/transferrecipient', data);

// Function to intiate transfer
const initiateTransfer = async data => paystackInstance.post('/transfer', data);

const sendOTP = async data => paystackInstance.post('/charge/submit_otp', data);

const confirmPayment = async reference =>
  paystackInstance.get(`/transaction/verify/${reference}`);

const confirmAccount = async data =>
  paystackInstance.get(
    `/bank/resolve?account_number=${data.accountNumber}&bank_code=${data.bankCode}`
  );

const getBanks = async () => paystackInstance.get('/bank?currency=GHS');

module.exports = {
  chargeUser,
  createTransferRecipient,
  initiateTransfer,
  sendOTP,
  confirmPayment,
  confirmAccount,
  getBanks,
};
