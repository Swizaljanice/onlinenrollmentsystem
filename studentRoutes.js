const express = require('express');
const StudentController = require('../controllers/studentController');
const router = express.Router();

router.post('/add', StudentController.addStudent);
router.get('/:email', StudentController.fetchStudent);

module.exports = router;
