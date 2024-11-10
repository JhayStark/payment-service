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
const chargeUser = async data => {
  return paystackInstance.post('/charge', data);
};

// Function to create a transfer recipient
const createTransferRecipient = async data => {
  return paystackInstance.post('/transferrecipient', data);
};

// Function to intiate transfer
const initiateTransfer = async data => {
  return paystackInstance.post('/transfer', data);
};

const sentdOTP = async data => {
  return paystackInstance.post('/charge/submit_otp', data);
};

const confirmPayment = async reference => {
  return paystackInstance.get(`/transaction/verify/${reference}`);
};

module.exports = {
  chargeUser,
  createTransferRecipient,
  initiateTransfer,
  sentdOTP,
  confirmPayment,
};
