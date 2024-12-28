const Student = require('../models/studentModel');

class StudentController {
  static async addStudent(req, res) {
    const { name, email } = req.body;
    const newStudent = new Student({ name, email });
    try {
      await newStudent.save();
      res.status(201).json(newStudent);
    } catch (err) {
      res.status(400).json({ error: 'Error adding student' });
    }
  }

  static async fetchStudent(req, res) {
    const { email } = req.params;
    try {
      const student = await Student.findOne({ email }).populate('enrolledCourses');
      if (!student) return res.status(404).json({ error: 'Student not found' });
      res.status(200).json(student);
    } catch (err) {
      res.status(400).json({ error: 'Error fetching student' });
    }
  }
}

module.exports = StudentController;
