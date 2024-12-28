const express = require('express');
const EnrollmentController = require('../controllers/enrollmentController');
const router = express.Router();

router.post('/enroll', EnrollmentController.enrollStudent);

module.exports = router;
