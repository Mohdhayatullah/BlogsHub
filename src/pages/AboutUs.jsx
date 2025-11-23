// src/pages/AboutUs.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaUsers, FaHeart, FaLightbulb, FaGlobe, FaShieldAlt } from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About BlogHub</h1>
          <p className="hero-subtitle">
            Empowering voices, connecting minds, and building a community of passionate storytellers
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At BlogHub, we believe everyone has a story worth sharing. Our mission is to provide 
                a platform where writers, thinkers, and creators can express themselves freely, connect 
                with like-minded individuals, and inspire positive change through the power of words.
              </p>
              <p>
                We're committed to fostering a diverse and inclusive community where ideas flourish, 
                conversations thrive, and creativity knows no bounds.
              </p>
            </div>
            <div className="mission-image">
              <div className="mission-icon">
                <FaRocket />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaUsers />
              </div>
              <h3>Community First</h3>
              <p>
                We prioritize building meaningful connections and fostering a supportive 
                environment for all our users.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h3>Authenticity</h3>
              <p>
                We encourage genuine expression and celebrate the unique perspectives 
                that each writer brings to our platform.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaLightbulb />
              </div>
              <h3>Innovation</h3>
              <p>
                We continuously improve our platform with cutting-edge features to enhance 
                the blogging experience.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaGlobe />
              </div>
              <h3>Inclusivity</h3>
              <p>
                We welcome voices from all backgrounds and strive to create a space 
                where diversity is celebrated.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaShieldAlt />
              </div>
              <h3>Safety & Privacy</h3>
              <p>
                We take user security seriously and implement robust measures to protect 
                your data and content.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <FaRocket />
              </div>
              <h3>Growth</h3>
              <p>
                We support writers in developing their craft and reaching wider audiences 
                through our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              BlogHub was born from a simple idea: everyone deserves a platform to share their 
              voice with the world. Founded in 2024, we started as a small project with big dreams 
              of democratizing content creation and making blogging accessible to all.
            </p>
            <p>
              Today, we're proud to be home to thousands of writers who use our platform to share 
              their stories, expertise, and perspectives. From personal journals to professional 
              thought leadership, BlogHub has become a vibrant ecosystem of diverse content and 
              engaged readers.
            </p>
            <p>
              As we continue to grow, our commitment remains unchanged: to provide the best 
              possible experience for writers and readers alike, while staying true to our core 
              values of authenticity, community, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join our community of passionate writers and readers today</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;