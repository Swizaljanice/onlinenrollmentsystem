const Course = require('../models/course');
const { sortCoursesByPopularity } = require('../utils/sorting');
const { buildBST, searchCourse } = require('../utils/bst');

// Get all courses (sorted by popularity)
exports.getAllCourses = async (req, res) => {
  try {
    let courses = await Course.find();
    courses = sortCoursesByPopularity(courses);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Enroll a student in a course
exports.enrollStudent = async (req, res) => {
  const { courseId, studentId } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    if (course.availableSlots <= 0) {
      return res.status(400).json({ error: 'No slots available' });
    }

    course.enrolledStudents.push(studentId);
    course.availableSlots -= 1;
    course.popularity += 1;
    await course.save();

    res.json({ message: 'Enrolled successfully', course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search for a course using BST
exports.searchCourse = async (req, res) => {
  const { courseName } = req.query;

  try {
    const courses = await Course.find();
    const bst = buildBST(courses);
    const result = searchCourse(bst, courseName);

    if (!result) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
