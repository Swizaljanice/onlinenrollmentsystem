const express = require('express');
const { getAllCourses, enrollStudent, searchCourse } = require('../controllers/coursesController');
const router = express.Router();

router.get('/', getAllCourses);
router.post('/enroll', enrollStudent);
router.get('/search', searchCourse);
router.post('/add', async (req, res) => {
    const { name, popularity, availableSlots } = req.body;
  
    try {
      const course = new Course({
        name,
        popularity,
        availableSlots
      });
  
      await course.save();
      res.status(201).json(course); // Send the saved course in the response
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
