const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 
  }
});

module.exports = mongoose.model('Verification', VerificationSchema);
