// src/pages/BlogDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogAPI, feedbackAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import FeedbackForm from '../components/FeedbackForm';
import { FaUser, FaCalendar, FaStar, FaArrowLeft, FaEdit, FaTrash, FaTag } from 'react-icons/fa';
import './BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogDetails();
    fetchFeedbacks();
  }, [id]);

  const fetchBlogDetails = async () => {
    try {
      const response = await blogAPI.getBlogById(id);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await feedbackAPI.getFeedbackByBlog(id);
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.deleteBlog(id);
        navigate('/my-blogs');
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isOwner = user && blog && user.email === blog.userName;

  if (loading) {
    return (
      <div className="loading-container" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="empty-state" style={{ minHeight: '60vh' }}>
        <h3>Blog not found</h3>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="blog-details-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> Back
        </button>

        <article className="blog-article">
          <header className="blog-header">
            <h1 className="blog-title">{blog.title}</h1>
            
            <div className="blog-meta">
              <div className="meta-left">
                <span className="meta-item">
                  <FaUser /> {blog.userName || 'Anonymous'}
                </span>
                <span className="meta-item">
                  <FaCalendar /> {formatDate(blog.createdAt)}
                </span>
                {blog.averageRating > 0 && (
                  <span className="meta-item rating">
                    <FaStar /> {blog.averageRating}
                  </span>
                )}
              </div>

              {isOwner && (
                <div className="blog-actions">
                  <Link to={`/edit-blog/${blog.id}`} className="btn btn-secondary btn-sm">
                    <FaEdit /> Edit
                  </Link>
                  <button onClick={handleDelete} className="btn btn-danger btn-sm">
                    <FaTrash /> Delete
                  </button>
                </div>
              )}
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="blog-tags">
                <FaTag className="tag-icon" />
                {blog.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="blog-content">
            <p>{blog.description}</p>
          </div>
        </article>

        <section className="feedback-section">
          <h2>Reviews & Ratings</h2>
          
          {isAuthenticated ? (
            <FeedbackForm blogId={id} onFeedbackSubmitted={fetchFeedbacks} />
          ) : (
            <div className="login-prompt">
              <p>Please <Link to="/login">login</Link> to leave a review</p>
            </div>
          )}

          <div className="feedbacks-list">
            {feedbacks.length === 0 ? (
              <p className="no-feedback">No reviews yet. Be the first to review!</p>
            ) : (
              feedbacks.map((feedback) => (
                <div key={feedback.id} className="feedback-item">
                  <div className="feedback-header">
                    <div className="feedback-user">
                      <FaUser />
                      <span>User #{feedback.user?.id}</span>
                    </div>
                    <div className="feedback-rating">
                      <FaStar />
                      <span>{feedback.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="feedback-comment">{feedback.comment}</p>
                  <span className="feedback-date">
                    {formatDate(feedback.createdAt)}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetails;