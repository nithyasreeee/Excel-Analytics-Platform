import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import FileDetails from '../pages/FileDetails';
import AnalysisResults from '../pages/AnalysisResults';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Documentation from '../pages/Documentation';
import NotFound from '../pages/NotFound';

const AppRoutes = ({ isAuthenticated, token, user, setToken }) => {
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route path="/documentation" element={<Documentation />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard token={token} user={user} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/files/:fileId" 
        element={
          <ProtectedRoute>
            <FileDetails token={token} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/analysis/:fileId" 
        element={
          <ProtectedRoute>
            <AnalysisResults token={token} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile token={token} user={user} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Settings token={token} />
          </ProtectedRoute>
        } 
      />
      
      {/* Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
