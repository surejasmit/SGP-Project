const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['admin', 'user']
  },
  username: {
    type: String,
    sparse: true, // Allows null but unique when present
    index: true
  },
  email: {
    type: String,
    sparse: true, // Allows null but unique when present
    index: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'info' // Collection name
});

// Compound index for unique username per type
infoSchema.index({ type: 1, username: 1 }, { unique: true, sparse: true });
// Compound index for unique email per type
infoSchema.index({ type: 1, email: 1 }, { unique: true, sparse: true });

const Info = mongoose.model('Info', infoSchema);

module.exports = Info;

