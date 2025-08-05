import React from 'react';
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="signup-container">
      <header className="signup-header">
        <span className="logo">🏋️ FitBud</span>
        <button className="login-btn">Log In</button>
      </header>

      <main className="form-section">
        <div className="form-wrapper">
          <h2>Create your account</h2>
          <form>
            <label>Name</label>
            <input type="text" placeholder="Enter your name" />

            <label>Email</label>
            <input type="email" placeholder="Enter your email" />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" />

            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" />

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
