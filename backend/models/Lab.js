const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  labName: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ["Lab", "Classroom"],
    required: true
  },
  equipment: {
    computers: {
      type: Number,
      default: 0
    },
    lights: {
      type: Number,
      default: 0
    },
    fans: {
      type: Number,
      default: 0
    },
    smartBoard: {
      type: Boolean,
      default: false
    }
  },
  status: {
    type: String,
    enum: ["normal", "issue"],
    default: "normal"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lab', labSchema);