const Receipt = require('./model');

const createNewReceipt = async receipt => {
  return await Receipt.create(receipt);
};

const getReceiptByReference = async reference => {
  return await Receipt.findOne({ reference });
};

const getAllServiceReceipts = async serviceId => {
  return await Receipt.find({ service: serviceId }).sort({ createdAt: -1 });
};

const updateReceipt = async (reference, data) => {
  return await Receipt.findOneAndUpdate({ reference }, data, { new: true });
};

module.exports = {
  createNewReceipt,
  getReceiptByReference,
  getAllServiceReceipts,
  updateReceipt,
};
