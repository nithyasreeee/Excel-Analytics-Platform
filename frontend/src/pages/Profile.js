import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateProfile, changePassword } from '../api';

export default function Profile({ token, setToken }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await getUserProfile(token);
        setProfile(res.data);
        setFormData(prev => ({
          ...prev,
          name: res.data.name,
          email: res.data.email
        }));
      } catch (err) {
        setError('Failed to load profile information.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        email: formData.email
      };

      // Only include password fields if the user is trying to change password
      if (formData.currentPassword && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      await updateProfile(updateData, token);
      setSuccess('Profile updated successfully!');
      
      // Clear password fields after successful update
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fafb] pt-20 px-4">
        <div className="max-w-2xl mx-auto flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#39b54b]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1f2937] mb-6">Your Profile</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-[#fff0e0] border border-[#f59e0b] rounded-lg">
            <p className="text-[#7c3c00]">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-[#edf7ed] border border-[#39b54b] rounded-lg">
            <p className="text-[#246626]">{success}</p>
          </div>
        )}
        
        <div className="bg-white shadow-sm rounded-lg border border-[#e5e7eb] overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-shrink-0 h-16 w-16 bg-[#3f4a8a] rounded-full flex items-center justify-center text-white text-xl font-bold">
                {profile && profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1f2937]">{profile && profile.name}</h2>
                <p className="text-[#6b7280]">Member since {profile && new Date(profile.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#6b7280] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-[#e5e7eb] rounded-md py-2 px-3 text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#3f4a8a] focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#6b7280] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-[#e5e7eb] rounded-md py-2 px-3 text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#3f4a8a] focus:border-transparent"
                />
              </div>
              
              <div className="border-t border-[#e5e7eb] pt-6">
                <h3 className="text-lg font-medium text-[#1f2937] mb-4">Change Password</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-[#6b7280] mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full border border-[#e5e7eb] rounded-md py-2 px-3 text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#3f4a8a] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-[#6b7280] mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full border border-[#e5e7eb] rounded-md py-2 px-3 text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#3f4a8a] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#6b7280] mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full border border-[#e5e7eb] rounded-md py-2 px-3 text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#3f4a8a] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#39b54b] text-white rounded-md hover:bg-[#2a9939] transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 border border-[#e5e7eb] bg-white text-[#6b7280] rounded-md hover:bg-[#f9fafb] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-[#f9fafb] px-6 py-4 border-t border-[#e5e7eb]">
            <button
              onClick={() => setToken('')}
              className="flex items-center text-[#f59e0b] hover:text-[#d97706] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
