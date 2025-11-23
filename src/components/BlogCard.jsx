// src/components/BlogCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendar, FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import './BlogCard.css';

const BlogCard = ({ blog, onDelete, showActions = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-card">
      <div className="blog-card-header">
        <div className="blog-meta">
          <span className="blog-author">
            <FaUser /> {blog.userName || 'Anonymous'}
          </span>
          <span className="blog-date">
            <FaCalendar /> {formatDate(blog.createdAt)}
          </span>
        </div>
        {blog.averageRating > 0 && (
          <div className="blog-rating">
            <FaStar className="star-icon" />
            <span>{blog.averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <Link to={`/blog/${blog.id}`} className="blog-card-link">
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-description">
          {blog.description.substring(0, 150)}
          {blog.description.length > 150 ? '...' : ''}
        </p>
      </Link>

      {blog.tags && blog.tags.length > 0 && (
        <div className="blog-tags">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="blog-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {showActions && (
        <div className="blog-actions">
          <Link to={`/edit-blog/${blog.id}`} className="btn btn-secondary btn-sm">
            <FaEdit /> Edit
          </Link>
          <button onClick={() => onDelete(blog.id)} className="btn btn-danger btn-sm">
            <FaTrash /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;