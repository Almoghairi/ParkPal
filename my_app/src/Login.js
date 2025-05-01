import Home from "./HomePage";
import SignUp from "./SignUp";
import React, { useState } from "react";
import HomePage from "./HomePage";
import { Link } from "react-router";
import { color } from "framer-motion";



function Login() {
    const [showHomePage, setShowHomePage] = useState(false);
    const [showSignUpPage, setShowSignUpPage] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const { email, password } = formData;
  
      const newErrors = {};
      if (!email) newErrors.email = "Please enter your email.";
      if (!password) newErrors.password = "Please enter your password.";
      setErrors(newErrors);
  
      if (Object.keys(newErrors).length > 0) return;
  
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        if (!response.ok) {
          alert(data.message || "Login failed");
        } else {
          localStorage.setItem("token", data.token); // Save JWT token
          setShowHomePage(true);
        }
      } catch (err) {
        alert("Server error. Please try again later.");
      }
    };
  
    if (showHomePage) return <HomePage />;
    if (showSignUpPage) return <SignUp />;
  
    return (
<div id="login-page">
  <div className="login-card">
    <h1>Welcome to ParkPal</h1>
    <p>Please log in to continue.</p>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? "error" : ""}
        />
        {errors.password && (
          <span className="error-text">{errors.password}</span>
        )}
      </div>
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account? <Link to="/signup"><strong>Sign Up</strong></Link>
    </p>
  </div>
</div>
    );
  }
  
  export default Login;