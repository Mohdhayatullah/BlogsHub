// src/pages/EditBlog.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { FaSave, FaTimes, FaTag } from 'react-icons/fa';
import '../pages/CreateBlog.css';

const EditBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    published: true,
    slug: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBlogById(id);
      const blog = response.data;
      setFormData({
        title: blog.title,
        description: blog.description,
        published: blog.published,
        slug: blog.slug,
        tags: blog.tags || []
      });
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog');
    } finally {
      setFetching(false);
    }
  };

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

    setLoading(true);

    try {
      await blogAPI.updateBlog(id, formData);
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error('Error updating blog:', error);
      setError(error.response?.data?.message || 'Failed to update blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="loading-container" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="create-blog-page">
      <div className="container">
        <div className="page-header">
          <h1>Edit Blog</h1>
          <p>Update your blog content</p>
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
              <label htmlFor="slug">URL Slug</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="custom-url-slug"
              />
            </div>

            <div className="input-group">
              <label htmlFor="description">Blog Content *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write your blog content here..."
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
                <span>Published</span>
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate(`/blog/${id}`)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <span className="flex-center gap-2">
                    <div className="spinner-small"></div>
                    Updating...
                  </span>
                ) : (
                  <>
                    <FaSave /> Update Blog
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

export default EditBlog;