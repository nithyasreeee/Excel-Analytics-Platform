import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, loginUser } from '../api';

export default function Register({ setToken }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If token exists in localStorage, redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Register the user
      const registerResponse = await registerUser({ name, email, password });
      setSuccess('Registration successful!');
      
      // Automatically log in the user
      try {
        const loginResponse = await loginUser({ email, password });
        const token = loginResponse.data.token;
        setToken(token);
        
        // Set token in localStorage for persistence
        localStorage.setItem('token', token);
        
        // Navigate to dashboard after a short delay to show success message
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 1000);
      } catch (loginErr) {
        // If auto-login fails, redirect to login page
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9fafb]">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 transform transition-all hover:scale-[1.01] border border-[#e5e7eb]">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#1f2937]">Create Account</h2>
          <div className="mb-6">
            <label className="block text-[#1f2937] text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="appearance-none border border-[#e5e7eb] rounded-lg w-full py-3 px-4 text-[#1f2937] leading-tight focus:outline-none focus:shadow-outline focus:border-[#3f4a8a] transition-all"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#1f2937] text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="appearance-none border border-[#e5e7eb] rounded-lg w-full py-3 px-4 text-[#1f2937] leading-tight focus:outline-none focus:shadow-outline focus:border-[#3f4a8a] transition-all"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#1f2937] text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="appearance-none border border-[#e5e7eb] rounded-lg w-full py-3 px-4 text-[#1f2937] leading-tight focus:outline-none focus:shadow-outline focus:border-[#3f4a8a] transition-all"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#1f2937] text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="appearance-none border border-[#e5e7eb] rounded-lg w-full py-3 px-4 text-[#1f2937] leading-tight focus:outline-none focus:shadow-outline focus:border-[#3f4a8a] transition-all"
              required
            />
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-[#fff0e0] border border-[#f59e0b]">
              <p className="text-[#7c3c00] text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-[#edf7ed] border border-[#39b54b]">
              <p className="text-[#246626] text-sm">{success}</p>
            </div>
          )}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-bold py-3 px-4 rounded-lg transform transition-all hover:scale-[1.02] ${
                loading 
                  ? 'bg-[#9ca3af] cursor-not-allowed' 
                  : 'bg-[#39b54b] hover:bg-[#2a9939] focus:outline-none focus:shadow-outline'
              }`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-[#6b7280]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#3f4a8a] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
