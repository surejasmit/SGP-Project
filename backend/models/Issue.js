const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  labId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab',
    required: true
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  equipmentType: {
    type: String,
    required: true,
    enum: ["general", "computers", "lights", "fans", "smartBoard"]
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ["open", "resolved"],
    default: "open"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Issue', issueSchema);