const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  instructor: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);