const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  lab_number: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'labs'
});

const Lab = mongoose.model('Lab', labSchema);

module.exports = Lab;

