import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add authorization header to requests when token is available
const setAuthHeader = (token) => {
  if (token) {
    return { headers: { Authorization: `Bearer ${token}` } };
  }
  return {};
};

// Authentication API calls
export const loginUser = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

export const registerUser = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const verifyToken = (token) => {
  return apiClient.get('/auth/verify', setAuthHeader(token));
};

// User Profile API calls
export const getUserProfile = (token) => {
  return apiClient.get('/users/profile', setAuthHeader(token));
};

export const updateUserProfile = (userData, token) => {
  return apiClient.put('/users/profile', userData, setAuthHeader(token));
};

export const changePassword = (passwordData, token) => {
  return apiClient.put('/users/password', passwordData, setAuthHeader(token));
};

// Files API calls
export const getUserFiles = (token) => {
  return apiClient.get('/files', setAuthHeader(token));
};

export const uploadFile = (fileData, token, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', fileData);
  
  return apiClient.post('/files/upload', formData, {
    ...setAuthHeader(token),
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress
  });
};

export const getFileDetails = (fileId, token) => {
  return apiClient.get(`/files/${fileId}`, setAuthHeader(token));
};

export const getFileData = (fileId, page = 1, limit = 50, token) => {
  return apiClient.get(`/files/${fileId}/data?page=${page}&limit=${limit}`, setAuthHeader(token));
};

export const deleteFile = (fileId, token) => {
  return apiClient.delete(`/files/${fileId}`, setAuthHeader(token));
};

// Analysis API calls
export const getAnalysisSummary = (fileId, options, token) => {
  return apiClient.post(`/analysis/${fileId}/summary`, options, setAuthHeader(token));
};

export const getCorrelationAnalysis = (fileId, options, token) => {
  return apiClient.post(`/analysis/${fileId}/correlation`, options, setAuthHeader(token));
};

export const getRegressionAnalysis = (fileId, options, token) => {
  return apiClient.post(`/analysis/${fileId}/regression`, options, setAuthHeader(token));
};

export const getClusterAnalysis = (fileId, options, token) => {
  return apiClient.post(`/analysis/${fileId}/clusters`, options, setAuthHeader(token));
};

// Settings API calls
export const getUserSettings = (token) => {
  return apiClient.get('/users/settings', setAuthHeader(token));
};

export const updateSettings = (settingsData, token) => {
  return apiClient.put('/users/settings', settingsData, setAuthHeader(token));
};

// Export API calls
export const exportToExcel = (fileId, options, token) => {
  return apiClient.post(`/export/${fileId}/excel`, options, {
    ...setAuthHeader(token),
    responseType: 'blob'
  });
};

export const exportToCsv = (fileId, options, token) => {
  return apiClient.post(`/export/${fileId}/csv`, options, {
    ...setAuthHeader(token),
    responseType: 'blob'
  });
};

export const exportToPdf = (fileId, options, token) => {
  return apiClient.post(`/export/${fileId}/pdf`, options, {
    ...setAuthHeader(token),
    responseType: 'blob'
  });
};

// Error handling helper
export const handleApiError = (error) => {
  let errorMessage = 'An unexpected error occurred';
  
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage = error.response.data.message || error.response.data.error || `Error ${error.response.status}: ${error.response.statusText}`;
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = 'No response received from server. Please check your connection.';
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = error.message;
  }
  
  return errorMessage;
};
