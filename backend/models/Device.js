const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  lab_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['light', 'fan', 'computer']
  },
  is_on: {
    type: Number,
    default: 1 // 1 for ON, 0 for OFF
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'devices'
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;

