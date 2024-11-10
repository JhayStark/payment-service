const { Schema, model } = require('mongoose');

const receiptSchema = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    accountCharged: {
      type: String,
    },
    transactionType: {
      type: String,
      enum: ['momo-pay', 'bank-withdrawal', 'momo-withdrawal', 'card-pay'],
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'Recipient',
    },
  },
  { timestamps: true }
);

module.exports = model('Receipt', receiptSchema);
