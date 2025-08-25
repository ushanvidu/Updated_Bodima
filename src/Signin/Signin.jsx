import React, { useState } from 'react';
import './Signin.css';
import { Link }            from 'react-router-dom';
import {useNavigate}       from "react-router-dom";


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:8090/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Login successful!');
                console.log('Login successful:', data);

                // Check if admin credentials
                if (username === 'admin' && password === 'admin123') {
                    // Store admin data
                    localStorage.setItem('user', JSON.stringify({
                        userId: 'admin',
                        username: 'admin',
                        userName: 'Administrator',
                        email: 'admin@bodima.com',
                        phone: '',
                        role: 'admin'
                    }));
                    navigate('/admin');
                } else {
                    // Store regular user data
                    localStorage.setItem('user', JSON.stringify({
                        userId: data.userId,
                        username: data.username,
                        userName: data.userName,
                        email: data.email,
                        phone: data.phone,
                        role: 'user'
                    }));
                    navigate('/user');
                }


            } else {
                setError(data.error || 'Login failed');
                console.error('Login failed:', data);
            }
        } catch (error) {
            setError('Network error. Please check your connection.');
            console.error('Network error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Please enter your credentials to login</p>
                </div>

                {error && (
                    <div className="error-message" style={{
                        color: '#f72585',
                        backgroundColor: '#ffe6e6',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message" style={{
                        color: '#28a745',
                        backgroundColor: '#d4edda',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    <div className="options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="forgot-password">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className={`login1-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="spinner"></span>
                        ) : (
                            'Login'
                        )}
                    </button>

                    <div className="divider">
                        <span>or</span>
                    </div>


                    <p className="signup-link">
                        Don't have an account? <Link to="/contact">Contact Us</Link>
                    </p>
                </form>
            </div>

            <div className="login-decoration">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
        </div>
    );
};

export default LoginPage;