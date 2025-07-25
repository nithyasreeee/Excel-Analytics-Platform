import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Auth APIs
export const registerUser = (data) => axios.post(`${API_BASE}/user/register`, data);
export const loginUser = (data) => axios.post(`${API_BASE}/user/login`, data);
export const verifyToken = (token) => axios.get(`${API_BASE}/user/verify`, {
  headers: { 'Authorization': `Bearer ${token}` }
});

// Legacy exports for backward compatibility
export const register = registerUser;
export const login = loginUser;

// User Profile APIs
export const getUserProfile = (token) => axios.get(`${API_BASE}/user/profile`, {
  headers: { 'Authorization': `Bearer ${token}` }
});

export const updateProfile = (data, token) => axios.put(`${API_BASE}/user/profile`, data, {
  headers: { 'Authorization': `Bearer ${token}` }
});

export const changePassword = (data, token) => axios.put(`${API_BASE}/user/password`, data, {
  headers: { 'Authorization': `Bearer ${token}` }
});

// File APIs
export const uploadFile = (file, token, onUploadProgress) => {
  const formData = new FormData();
  formData.append('excelFile', file);
  
  return axios.post(`${API_BASE}/excel/upload`, formData, {
    headers: { 
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'multipart/form-data' 
    },
    onUploadProgress
  });
};

export const getUserFiles = (token) => axios.get(`${API_BASE}/excel/files`, {
  headers: { 'Authorization': `Bearer ${token}` }
});

// Legacy exports for backward compatibility
export const uploadExcel = uploadFile;
export const getFiles = getUserFiles;

export const getFileData = (fileId, token) => axios.get(`${API_BASE}/excel/files/${fileId}/data`, {
  headers: { 'Authorization': `Bearer ${token}` }
});

export const deleteFile = (fileId, token) => axios.delete(`${API_BASE}/excel/files/${fileId}`, {
  headers: { 'Authorization': `Bearer ${token}` }
});

// Analytics APIs
export const createAnalysis = (data, token) => axios.post(`${API_BASE}/analytics/create`, data, {
  headers: { 'Authorization': `Bearer ${token}` }
});

export const getAnalyses = (token) => axios.get(`${API_BASE}/analytics`, {
  headers: { 'Authorization': `Bearer ${token}` }
});

export const getAnalysisResults = (analysisId, token) => axios.get(`${API_BASE}/analytics/${analysisId}/results`, {
  headers: { 'Authorization': `Bearer ${token}` }
});

export const getAnalysisSummary = (fileId, options, token) => axios.post(`${API_BASE}/analytics/${fileId}/summary`, options, {
  headers: { 'Authorization': `Bearer ${token}` }
});

// Settings APIs
export const getUserSettings = (token) => axios.get(`${API_BASE}/user/settings`, {
  headers: { 'Authorization': `Bearer ${token}` }
});

export const updateSettings = (data, token) => axios.put(`${API_BASE}/user/settings`, data, {
  headers: { 'Authorization': `Bearer ${token}` }
});
