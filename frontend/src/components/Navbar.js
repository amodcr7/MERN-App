import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h2>MERN App</h2>
      <ul>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
