import { useNavigate } from 'react-router-dom';
import CourseList from '../components/CourseList';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <CourseList />
    </div>
  );
};

export default Dashboard;