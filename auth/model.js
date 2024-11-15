const { Schema, model } = require('mongoose');

const backendService = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    callbackUrl: {
      type: String,
      required: true,
    },
    webhookUrl: {
      type: String,
      required: true,
    },
    webhookSecret: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'active',
    },
    apiKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('BackendService', backendService);
