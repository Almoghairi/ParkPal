import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import './SignUp.css'; 
import Ani5 from './Ani5.json';
import Lottie from 'lottie-react';
import HomePage from './HomePage';

const SignUp = () => {
  const [showHomePage, setShowHomePage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is incorrect';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
  
    if (!validateForm()) return;
  
    try {
      const response = await fetch("https://parkpal-tzjr.onrender.com/api/auth/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
         name: formData.name,
         email: formData.email,
         password: formData.password
  })
      });
  
      const data = await response.json();
      if (!response.ok) {
        setAuthError(data.message || "Registration failed");
      } else {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      setAuthError("Server error. Please try again later.");
    }
  };
  if (showHomePage) {
    return <HomePage />;
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>
        
        {authError && <div className="error-message">{authError}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name </label>
            <input
              type="text" id="name" name="name"  onChange={handleChange} className={errors.name ? 'error' : ''}/>
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email </label>
            <input type="email" id="email" name="email" onChange={handleChange} className={errors.email ? 'error' : ''}/>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password </label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={errors.password ? 'error' : ''}style={{position: 'relative',zIndex: "1"}}/>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password </label>
            <input type="password" id="confirmPassword"name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? 'error' : '' } style={{position: 'relative',zIndex: "1"}}/>
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>
          <Lottie type= "submit" onClick={handleSubmit} style ={{width:"500px", margin:"auto", position: 'absolute', transform: 'translateY(45%) translateX(-15%)' }} animationData={Ani5} loop autoplay /> 
        </form>
      </div>
    </div>
  );
};

export default SignUp;