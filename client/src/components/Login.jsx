import React from 'react';
import './login.css';

const Login = () => {
  return (
    <div className="login-page">
      {/* Navbar */}
      <header>
        <div className="logo">FitTrack</div>
        <nav>
          <a href="#">Overview</a>
          <a href="#">Dashboard</a>
          <a href="#">Plans</a>
          <a href="#">Community</a>
          <a href="#">Help</a>
        </nav>
        <div className="top-right">
          <div className="profile">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" />
          </div>
        </div>
      </header>

      {/* Login Form */}
      <main>
        <div className="login-box">
          <h2>Welcome back</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter your username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="btn-login">Log in</button>
          </form>
          <div className="bottom-links">
            <p>Don’t have an account? <a href="#">Sign up</a></p>
            <p><a href="#">Forgot password?</a></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
