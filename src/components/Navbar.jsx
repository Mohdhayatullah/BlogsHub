// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes, FaUser, FaBlog } from 'react-icons/fa';
import './Navbar.css';
import { BookAIcon, Contact } from 'lucide-react';
import { FcAbout } from 'react-icons/fc';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <FaBlog className="brand-icon" />
            <span>BlogHub</span>
          </Link>

          <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/about" className="nav-link" onClick={closeMenu}>
              About <FcAbout />
            </Link>
            {/* <Link to="/contact" className="nav-link" onClick={closeMenu}>
              Contact<Contact />
            </Link> */}
            <NavLink to="/contact" className="nav-link" color='red' onClick={closeMenu}>
              Contact<Contact />
            </NavLink>
            
            {isAuthenticated ? (
              <>
                <Link to="/my-blogs" className="nav-link" onClick={closeMenu}>
                  My Blogs<BookAIcon />
                </Link>
                <Link to="/create-blog" className="nav-link" onClick={closeMenu}>
                  Create Blog
                </Link>
                <Link to="/profile" className="nav-link" onClick={closeMenu}>
                  <FaUser /> Profile
                </Link>
                <button className="btn btn-primary nav-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" onClick={closeMenu}>
                  <button className="btn btn-primary nav-btn">Sign Up</button>
                </Link>
              </>
            )}

            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>

          <div className="navbar-mobile">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button className="menu-toggle" onClick={toggleMenu}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;