// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import BlogCard from '../components/BlogCard';
import { FaSearch, FaPlus, FaFire, FaClock } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterAndSortBlogs();
  }, [searchTerm, sortBy, blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAllBlogs();
      setBlogs(response.data);
      setFilteredBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBlogs = () => {
    let filtered = [...blogs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.averageRating - a.averageRating);
    }

    setFilteredBlogs(filtered);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="highlight">BlogHub</span>
            </h1>
            <p className="hero-subtitle">
              Discover amazing stories, share your thoughts, and connect with writers from around the world.
            </p>
            <div className="hero-actions">
              <Link to="/create-blog" className="btn btn-primary btn-lg">
                <FaPlus /> Start Writing
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search blogs, authors, topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${sortBy === 'latest' ? 'active' : ''}`}
              onClick={() => setSortBy('latest')}
            >
              <FaClock /> Latest
            </button>
            <button
              className={`filter-btn ${sortBy === 'popular' ? 'active' : ''}`}
              onClick={() => setSortBy('popular')}
            >
              <FaFire /> Popular
            </button>
          </div>
        </div>
      </section>

      {/* Blogs Grid Section */}
      <section className="blogs-section">
        <div className="container">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading amazing content...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="empty-state">
              <h3>No blogs found</h3>
              <p>Try adjusting your search or be the first to create a blog!</p>
              <Link to="/create-blog" className="btn btn-primary">
                <FaPlus /> Create First Blog
              </Link>
            </div>
          ) : (
            <>
              <div className="section-header">
                <h2>Latest Blogs</h2>
                <p>{filteredBlogs.length} {filteredBlogs.length === 1 ? 'blog' : 'blogs'} found</p>
              </div>
              <div className="blogs-grid">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;