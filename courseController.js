const Course = require('../models/courseModel');
const Queue = require('../services/queueService');
const SortingService = require('../services/sortingService');

class CourseController {
  static async addCourse(req, res) {
    const { name, seats, popularity } = req.body;
    const newCourse = new Course({ name, seats, popularity });
    try {
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (err) {
      res.status(400).json({ error: 'Error adding course' });
    }
  }

  static async fetchCourses(req, res) {
    const courses = await Course.find();
    res.status(200).json(courses);
  }

  static async sortCourses(req, res) {
    const { type } = req.query;
    let courses = await Course.find();
    
    if (type === 'popularity') {
      courses = SortingService.sortByPopularity(courses);
    } else if (type === 'availability') {
      courses = SortingService.sortByAvailability(courses);
    }
    
    res.status(200).json(courses);
  }
}

module.exports = CourseController;
