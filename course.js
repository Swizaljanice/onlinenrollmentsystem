// models/course.js

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  popularity: { type: Number, default: 0 },
  availableSlots: { type: Number, required: true },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }] // Reference to students
});

module.exports = mongoose.model('course', courseSchema);
