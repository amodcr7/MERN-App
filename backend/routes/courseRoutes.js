const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createCourse, getCourses, updateCourse, deleteCourse } = require('../controllers/courseController');
const router = express.Router();

router.post('/', protect, createCourse); // Create course
router.get('/', getCourses); // Get all courses
router.put('/:id', protect, updateCourse); // Update course
router.delete('/:id', protect, deleteCourse); // Delete course

module.exports = router;
