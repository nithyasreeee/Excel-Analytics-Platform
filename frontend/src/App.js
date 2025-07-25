
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { verifyToken, getUserProfile } from './api';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verify token on app load
    const validateAuth = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        // Verify if token is valid
        await verifyToken(token);
        
        // Get user profile
        const userResponse = await getUserProfile(token);
        setUser(userResponse.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear invalid token
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, [token]);

  const handleSetToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
      
      // Force an immediate validation of the token
      const validateNewToken = async () => {
        try {
          // Verify the token is valid
          await verifyToken(newToken);
          
          // Get user profile
          const userResponse = await getUserProfile(newToken);
          setUser(userResponse.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Authentication error with new token:', error);
          handleLogout();
        }
      };
      
      validateNewToken();
    }
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#39b54b]"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={handleLogout} 
        />
        <main className="flex-grow">
          <AppRoutes 
            isAuthenticated={isAuthenticated}
            token={token}
            user={user}
            setToken={handleSetToken}
          />
        </main>
        <footer className="bg-[#1f2937] text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-[#e5e7eb]">
                  &copy; {new Date().getFullYear()} Excel Analytics Platform. All rights reserved.
                </p>
              </div>
              <div className="flex space-x-6">
                <a href="/terms" className="text-sm text-[#e5e7eb] hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="/privacy" className="text-sm text-[#e5e7eb] hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/documentation" className="text-sm text-[#e5e7eb] hover:text-white transition-colors">
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
