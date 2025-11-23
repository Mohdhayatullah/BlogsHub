// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    PhotoUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        PhotoUrl: user.PhotoUrl || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const result = await updateProfile(formData);

    if (result.success) {
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.error || 'Failed to update profile');
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      fullName: user.fullName || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      PhotoUrl: user.PhotoUrl || ''
    });
    setError('');
  };

  if (!user) {
    return (
      <div className="loading-container" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-container">
          <div className="profile-header">
            <h1>My Profile</h1>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
                <FaEdit /> Edit Profile
              </button>
            )}
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                {formData.PhotoUrl ? (
                  <img src={formData.PhotoUrl} alt="Profile" />
                ) : (
                  <FaUser />
                )}
              </div>
              {/* {isEditing && (
                <div className="input-group">
                  <label htmlFor="PhotoUrl">
                    <FaCamera /> Profile Photo URL
                  </label>
                  <input
                    type="url"
                    id="PhotoUrl"
                    name="PhotoUrl"
                    value={formData.PhotoUrl}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                  />
                </div>
              )} */}
              {isEditing && (
                <div className="input-group">
                  <label htmlFor="PhotoUrl">
                    <FaCamera /> Profile Photo URL
                  </label>
                  <input
                    type="file"
                    id="PhotoUrl"
                    name="PhotoUrl"
                    value={formData.PhotoUrl}
                    onChange={handleChange}
                    placeholder="jpg, jpeg, png...."
                  />
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="profile-form">
              <div className="input-group">
                <label htmlFor="fullName">
                  <FaUser /> Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">
                  <FaEnvelope /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing ? !isEditing:isEditing}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="phoneNumber">
                  <FaPhone /> Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              {isEditing && (
                <div className="form-actions">
                  <button type="button" onClick={handleCancel} className="btn btn-secondary">
                    <FaTimes /> Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <span className="flex-center gap-2">
                        <div className="spinner-small"></div>
                        Saving...
                      </span>
                    ) : (
                      <>
                        <FaSave /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="profile-stats">
            <div className="stat-card">
              <h3>Profile ID</h3>
              <p>{user.id}</p>
            </div>
            <div className="stat-card">
              <h3>Account Status</h3>
              <p className="status-active">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;