import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';

export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    setLoading(true);
    
    try {
      const response = await loginUser({ email, password });
      const token = response.data.token;
      
      // Call the setToken function from props
      setToken(token);
      
      // Set token in localStorage for persistence
      localStorage.setItem('token', token);
      
      // Force a small delay to ensure token is processed
      setTimeout(() => {
        // Redirect to dashboard
        navigate('/dashboard', { replace: true });
      }, 100);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9fafb]">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 transform transition-all hover:scale-[1.01] border border-[#e5e7eb]">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#1f2937]">Welcome Back</h2>
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
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="appearance-none border border-[#e5e7eb] rounded-lg w-full py-3 px-4 text-[#1f2937] leading-tight focus:outline-none focus:shadow-outline focus:border-[#3f4a8a] transition-all"
              required
            />
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-[#fff0e0] border border-[#f59e0b]">
              <p className="text-[#7c3c00] text-sm">{error}</p>
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
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-[#6b7280]">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#3f4a8a] hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
