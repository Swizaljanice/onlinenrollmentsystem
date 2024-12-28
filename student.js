// models/student.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }] // Reference to courses
});

module.exports = mongoose.model('student', studentSchema);
