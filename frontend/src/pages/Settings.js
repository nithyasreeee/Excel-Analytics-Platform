import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserSettings, updateSettings } from '../api';

export default function Settings({ token }) {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    defaultAnalysisType: 'summary',
    theme: 'light',
    notificationsEnabled: true,
    emailNotifications: false,
    dataRetentionDays: 30
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    async function fetchSettings() {
      try {
        setLoading(true);
        const res = await getUserSettings(token);
        setSettings(res.data);
        setFormData({
          defaultAnalysisType: res.data.defaultAnalysisType || 'summary',
          theme: res.data.theme || 'light',
          notificationsEnabled: res.data.notificationsEnabled !== false,
          emailNotifications: !!res.data.emailNotifications,
          dataRetentionDays: res.data.dataRetentionDays || 30
        });
      } catch (err) {
        setError('Failed to load settings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await updateSettings(formData, token);
      setSuccess('Settings updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update settings.');
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
        <h1 className="text-3xl font-bold text-[#1f2937] mb-6">Application Settings</h1>
        
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
            <form onSubmit={handleSettingsUpdate} className="space-y-6">
              {/* Analysis Settings */}
              <div>
                <h2 className="text-lg font-medium text-[#1f2937] mb-4">Analysis Preferences</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="defaultAnalysisType" className="block text-sm font-medium text-[#6b7280] mb-1">
                      Default Analysis Type
                    </label>
                    <select
                      id="defaultAnalysisType"
                      name="defaultAnalysisType"
                      value={formData.defaultAnalysisType}
                      onChange={handleInputChange}
                      className="w-full border border-[#e5e7eb] rounded-md py-2 px-3 text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#3f4a8a] focus:border-transparent"
                    >
                      <option value="summary">Summary Statistics</option>
                      <option value="correlation">Correlation Analysis</option>
                      <option value="regression">Regression Analysis</option>
                      <option value="clusters">Cluster Analysis</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Interface Settings */}
              <div className="border-t border-[#e5e7eb] pt-6">
                <h2 className="text-lg font-medium text-[#1f2937] mb-4">Interface Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="theme" className="block text-sm font-medium text-[#6b7280] mb-1">
                      Theme
                    </label>
                    <select
                      id="theme"
                      name="theme"
                      value={formData.theme}
                      onChange={handleInputChange}
                      className="w-full border border-[#e5e7eb] rounded-md py-2 px-3 text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#3f4a8a] focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System Default</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Notification Settings */}
              <div className="border-t border-[#e5e7eb] pt-6">
                <h2 className="text-lg font-medium text-[#1f2937] mb-4">Notifications</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notificationsEnabled"
                      name="notificationsEnabled"
                      checked={formData.notificationsEnabled}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#39b54b] focus:ring-[#39b54b] border-[#e5e7eb] rounded"
                    />
                    <label htmlFor="notificationsEnabled" className="ml-2 block text-sm text-[#1f2937]">
                      Enable in-app notifications
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#39b54b] focus:ring-[#39b54b] border-[#e5e7eb] rounded"
                    />
                    <label htmlFor="emailNotifications" className="ml-2 block text-sm text-[#1f2937]">
                      Send email notifications
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Data Settings */}
              <div className="border-t border-[#e5e7eb] pt-6">
                <h2 className="text-lg font-medium text-[#1f2937] mb-4">Data Management</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="dataRetentionDays" className="block text-sm font-medium text-[#6b7280] mb-1">
                      Data Retention Period (days)
                    </label>
                    <input
                      type="number"
                      id="dataRetentionDays"
                      name="dataRetentionDays"
                      min="1"
                      max="365"
                      value={formData.dataRetentionDays}
                      onChange={handleInputChange}
                      className="w-full border border-[#e5e7eb] rounded-md py-2 px-3 text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#3f4a8a] focus:border-transparent"
                    />
                    <p className="mt-1 text-sm text-[#6b7280]">
                      Data will be automatically deleted after this many days of inactivity.
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#fff0e0] text-[#f59e0b] border border-[#f59e0b] rounded-md hover:bg-[#fff8ec] transition-colors"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
                          // Delete all data API call would go here
                          alert('This would delete all your data in a real application.');
                        }
                      }}
                    >
                      Delete All My Data
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 border-t border-[#e5e7eb] pt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#39b54b] text-white rounded-md hover:bg-[#2a9939] transition-colors"
                >
                  Save Settings
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
        </div>
      </div>
    </div>
  );
}
