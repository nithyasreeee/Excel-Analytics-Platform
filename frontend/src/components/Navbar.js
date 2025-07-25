import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ isAuthenticated, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close profile dropdown when mobile menu is toggled
    if (profileDropdownOpen) setProfileDropdownOpen(false);
  };
  
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };
  
  const handleLogout = () => {
    onLogout();
    navigate('/login');
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#3f4a8a] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl hover:text-[#e5e7eb] transition-colors flex items-center">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5Z" stroke="#39b54b" strokeWidth="2" />
                <path d="M3 9H21" stroke="#39b54b" strokeWidth="2" />
                <path d="M9 9V21" stroke="#39b54b" strokeWidth="2" />
              </svg>
              Excel Analytics
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-[#2f3b7a] transition-colors">
                  Dashboard
                </Link>
                <Link to="/documentation" className="px-3 py-2 rounded-md hover:bg-[#2f3b7a] transition-colors">
                  Documentation
                </Link>
                
                {/* Profile Dropdown */}
                <div className="relative ml-4">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-[#2f3b7a] transition-colors focus:outline-none"
                  >
                    <span className="mr-2">{user?.name || 'User'}</span>
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-[#1f2937]">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-[#f9fafb] transition-colors"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 hover:bg-[#f9fafb] transition-colors"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-[#f9fafb] transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/documentation" className="px-3 py-2 rounded-md hover:bg-[#2f3b7a] transition-colors">
                  Documentation
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md hover:bg-[#2f3b7a] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-2 px-4 py-2 bg-[#39b54b] text-white font-semibold rounded-md hover:bg-[#2a9939] transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#2f3b7a] focus:outline-none transition-colors"
            >
              <svg
                className={`h-6 w-6 ${mobileMenuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${mobileMenuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#3f4a8a] shadow-inner">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md hover:bg-[#2f3b7a] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/documentation"
                className="block px-3 py-2 rounded-md hover:bg-[#2f3b7a] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Documentation
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md hover:bg-[#2f3b7a] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md hover:bg-[#2f3b7a] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-[#2f3b7a] transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/documentation"
                className="block px-3 py-2 rounded-md hover:bg-[#2f3b7a] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Documentation
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md hover:bg-[#2f3b7a] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 bg-[#39b54b] text-white font-semibold rounded-md hover:bg-[#2a9939] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
