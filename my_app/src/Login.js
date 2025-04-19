import Home from "./HomePage";
import SignUp from "./SignUp";
import React, { useState } from "react";
import HomePage from "./HomePage";
import { Link } from "react-router";
import { color } from "framer-motion";



function Login() {
    const [showHomePage, setShowHomePage] = useState(false); 
    const [showSignUpPage, setShowSignUpPage] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username) {
           document.getElementById("usernameError").innerText = "Please enter a username.";
           return; 
        }
        if (!password) {
           document.getElementById("passwordError").innerText = "Please enter a password.";
           return; 
        }

        alert("Login successful!");
        const loginLink = document.querySelector("#Login");
        if (loginLink) {
            loginLink.style.display = "none";
            setShowHomePage(true);
        }
    };
    if (showHomePage) {
        return <HomePage />;
    }
    if (showSignUpPage) {
        return <SignUp />;
    }
    return (
        <div id="login-page">
            <h1>Welcome to ParkPal</h1>
            <p>Please log in to continue.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" placeholder="Username" />
                <p id="usernameError" style={{color: "red"}}></p>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" placeholder="Password" />
                <p id="passwordError" style={{color: "red"}}></p>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
}

export default Login;