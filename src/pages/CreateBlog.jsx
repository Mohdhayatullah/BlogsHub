// src/pages/CreateBlog.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { FaSave, FaTimes, FaTag, FaPushed } from 'react-icons/fa';
import './CreateBlog.css';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    published: true,
    slug: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.title.length < 5) {
      setError('Title must be at least 5 characters long');
      return;
    }

    if (formData.description.length < 50) {
      setError('Description must be at least 50 characters long');
      return;
    }

    setLoading(true);

    try {
      // Generate slug from title if not provided
      const slug = formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-');
      
      const blogData = {
        ...formData,
        slug
      };

      await blogAPI.createBlog(blogData);
      navigate('/my-blogs');
    } catch (error) {
      console.error('Error creating blog:', error);
      setError(error.response?.data?.message || 'Failed to create blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-blog-page">
      <div className="container">
        <div className="page-header">
          <h1>Create New Blog</h1>
          <p>Share your thoughts and ideas with the world</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-card">
            <div className="input-group">
              <label htmlFor="title">Blog Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter an engaging title for your blog"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="slug">URL Slug (Optional)</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="custom-url-slug (leave empty to auto-generate)"
              />
              <small>If left empty, will be generated from title</small>
            </div>

            <div className="input-group">
              <label htmlFor="description">Blog Content *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write your blog content here... (minimum 50 characters)"
                rows="12"
                required
              />
              <small>{formData.description.length} characters</small>
            </div>

            <div className="input-group">
              <label htmlFor="tags">
                <FaTag /> Tags
              </label>
              <div className="tag-input-container">
                <input
                  type="text"
                  id="tagInput"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
                  placeholder="Add tags (press Enter)"
                />
                <button type="button" onClick={handleAddTag} className="btn btn-secondary btn-sm">
                  Add Tag
                </button>
              </div>
              <div className="tags-display">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="tag-remove"
                    >
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                />
                <span> <FaPushed /> Publish immediately</span>
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/my-blogs')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <span className="flex-center gap-2">
                    <div className="spinner-small"></div>
                    Creating...
                  </span>
                ) : (
                  <>
                    <FaSave /> Create Blog
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;