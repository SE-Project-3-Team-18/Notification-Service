// Import mongoose
const mongoose = require('mongoose');

// Define otp schema
const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  viewed: {
    type: Boolean,
    default: false,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
}, {
  // Add toJSON option to customize JSON output
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id; // Replace _id with id
      delete ret._id; // Remove _id
      delete ret.__v; // Remove __v
    },
  },
});

// Create User model
const Notification = mongoose.model('Notification', notificationSchema);

// Export the model
module.exports = Notification;
