import { useState, useEffect } from 'react';
import API from '../services/api';
import CourseForm from './CourseForm';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      
      const res = await API.get('/courses');
      console.log('Courses response:', res.data); 
      setCourses(res.data);
      setError('');
    } catch (error) {
      console.error('Error fetching courses:', error.response || error);
      setError('Failed to fetch courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newCourse) => {
    try {
      console.log('Adding course:', newCourse);
      
      const res = await API.post('/courses', newCourse);
      console.log('Add course response:', res.data); 
      
      setCourses([...courses, res.data]);
      setShowAddForm(false);
      setError('');
    } catch (error) {
      console.error('Error adding course:', error.response || error);
      setError(error.response?.data?.message || 'Failed to add course');
    }
  };



  return (
    <div className="course-list">
      <h2>My Courses</h2>
      {error && <div className="error-message">{error}</div>}
      
      
      <div style={{ fontSize: '12px', color: 'gray', marginBottom: '10px' }}>
        User ID: {JSON.parse(localStorage.getItem('user'))?.id || 'Not found'}
      </div>
      
      <button onClick={() => setShowAddForm(true)}>Add New Course</button>

      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p>No courses found. Create your first course!</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p>Instructor: {course.instructor}</p>
              <p className="small">Course ID: {course._id}</p>
              <p className="small">Owner ID: {course.user}</p>
              <div className="course-actions">
                <button onClick={() => handleEdit(course)}>Edit</button>
                <button onClick={() => handleDelete(course._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

    
      {showAddForm && (
        <CourseForm onSubmit={handleAdd} onCancel={() => setShowAddForm(false)} />
      )}
      {editingCourse && (
        <CourseForm 
          course={editingCourse} 
          onSubmit={handleUpdate} 
          onCancel={() => setEditingCourse(null)} 
        />
      )}
    </div>
  );
};

export default CourseList;