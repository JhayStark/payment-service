const Recipient = require('./model');

const createNewRecipient = async recipient => {
  return await Recipient.create(recipient);
};

const getRecipientByAccountNumber = async accountNumber => {
  return await Recipient.findOne({ accountNumber });
};

module.exports = {
  createNewRecipient,
  getRecipientByAccountNumber,
};
