const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
const Queue = require('../services/queueService');

class EnrollmentController {
  static async enrollStudent(req, res) {
    const { studentEmail, courseName } = req.body;
    const student = await Student.findOne({ email: studentEmail });
    const course = await Course.findOne({ name: courseName });

    if (!student) return res.status(404).json({ error: 'Student not found' });
    if (!course) return res.status(404).json({ error: 'Course not found' });

    if (course.seats <= 0) {
      Queue.enqueue({ student, course });
      return res.status(200).json({ message: 'Student added to the waiting list' });
    }

    student.enrolledCourses.push(course);
    course.seats -= 1;
    await student.save();
    await course.save();

    res.status(200).json({ message: 'Student enrolled successfully' });
  }
}

module.exports = EnrollmentController;
