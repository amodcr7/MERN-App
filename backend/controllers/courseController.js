const Course = require('../models/Course');

const createCourse = async (req, res) => {
  try {
    const { name, description, instructor } = req.body;
    const course = await Course.create({
      name,
      description,
      instructor,
      user: req.user.id // Add the user ID from the auth middleware
    });
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    // Only fetch courses for the logged-in user
    const courses = await Course.find({ user: req.user.id });
    res.json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    // Check if course exists
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Verify the course belongs to the user
    if (course.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this course' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    // Check if course exists
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Verify the course belongs to the user
    if (course.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this course' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course Deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };