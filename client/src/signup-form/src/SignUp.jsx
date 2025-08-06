import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Submitting form with data:", formData);

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      console.log("✅ Server response:", data);

      if (response.ok) {
        alert("✅ Signup successful!");
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        alert(`❌ Signup failed: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("❌ Failed to connect to server.");
    }
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <span className="logo">🏋️ FitBud</span>
        <button className="login-btn">Log In</button>
      </header>

      <main className="form-section">
        <div className="form-wrapper">
          <h2>Create your account</h2>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />

            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <p className="terms">
            By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
