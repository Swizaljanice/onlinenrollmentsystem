const Student = require('../models/student');  // Ensure the path is correct
const Course = require('../models/course');    // Add the Course model to populate the course details

// Get all students with populated enrolledCourses
exports.getAllStudents = async (req, res) => {
  try {
    // Use populate to fetch course details for each student
    const students = await Student.find().populate('enrolledCourses');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new student
exports.addStudent = async (req, res) => {
  const { name } = req.body;

  try {
    const student = new Student({ name });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Enroll a student in a course
exports.enrollStudentInCourse = async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    // Check if course has available slots
    if (course.availableSlots <= 0) {
      return res.status(400).json({ error: "No available slots in this course" });
    }

    // Add the course to the student's enrolledCourses array
    student.enrolledCourses.push(course._id);

    // Decrease the available slots of the course and increase popularity
    course.availableSlots -= 1;
    course.popularity += 1;

    await student.save();
    await course.save();

    res.status(200).json({ message: "Student enrolled successfully", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
