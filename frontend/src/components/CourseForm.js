import { useState, useEffect } from 'react';

const CourseForm = ({ course = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    instructor: ''
  });

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        description: course.description,
        instructor: course.instructor
      });
    }
  }, [course]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (course) {
        await onSubmit({ ...formData, _id: course._id });
      } else {
        await onSubmit(formData);
      }
      setFormData({ name: '', description: '', instructor: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <input
        type="text"
        name="name"
        placeholder="Course Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Course Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="instructor"
        placeholder="Instructor"
        value={formData.instructor}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {course ? 'Update Course' : 'Create Course'}
      </button>
    </form>
  );
};

export default CourseForm;