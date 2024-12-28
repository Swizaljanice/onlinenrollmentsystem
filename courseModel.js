const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seats: { type: Number, required: true },
  popularity: { type: Number, default: 0 },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
