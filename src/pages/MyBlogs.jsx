// src/pages/MyBlogs.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import BlogCard from '../components/BlogCard';
import { FaPlus, FaEdit } from 'react-icons/fa';
import './MyBlogs.css';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const response = await blogAPI.getMyBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog.id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog. Please try again.');
      }
    }
  };

  return (
    <div className="my-blogs-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>My Blogs</h1>
            <p>Manage and track your published content</p>
          </div>
          <Link to="/create-blog" className="btn btn-primary">
            <FaPlus /> Create New Blog
          </Link>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading your blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="empty-state">
            <FaEdit className="empty-icon" />
            <h3>No Blogs Yet</h3>
            <p>Start sharing your thoughts and ideas with the world!</p>
            <Link to="/create-blog" className="btn btn-primary">
              <FaPlus /> Create Your First Blog
            </Link>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onDelete={handleDelete}
                showActions={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;