const express = require('express');
const CourseController = require('../controllers/courseController');
const router = express.Router();

router.post('/add', CourseController.addCourse);
router.get('/', CourseController.fetchCourses);
router.get('/sort', CourseController.sortCourses);

module.exports = router;
