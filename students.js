const express = require('express');
const Student = require('../models/student'); // Assuming you've defined this model
const Course = require('../models/course'); // Assuming you've defined this model

const router = express.Router();

// POST route to add a new student
router.post('/add', async (req, res) => {
  const { name } = req.body;

  try {
    const student = new Student({ name });
    await student.save();
    res.status(201).json(student); // Return the student data
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST route to enroll a student in a course
router.post('/enroll', async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ error: 'Student or Course not found' });
    }

    // Enroll the student and update the course
    student.enrolledCourses.push(course._id); // Assuming enrolledCourses stores ObjectIds
    course.availableSlots -= 1; // Decrease available slots in the course
    await student.save();
    await course.save();

    res.status(200).json({ message: 'Student enrolled successfully', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
