import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFiles, uploadFile, deleteFile } from '../api';

// File Card Component
const FileCard = ({ file, onView, onAnalyze, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-[#1f2937] truncate max-w-[200px]" title={file.filename}>
          {file.filename}
        </h3>
        <span className="text-xs px-2 py-1 bg-[#f3f4f6] rounded-full text-[#6b7280]">
          {file.fileType}
        </span>
      </div>
      <div className="text-xs text-[#6b7280] mb-3">
        <div className="flex justify-between mb-1">
          <span>Uploaded:</span>
          <span>{formatDate(file.createdAt)}</span>
        </div>
        <div className="flex justify-between">
          <span>Size:</span>
          <span>{Math.round(file.size / 1024)} KB</span>
        </div>
      </div>
      <div className="flex justify-between mt-4 pt-3 border-t border-[#f3f4f6]">
        <button
          onClick={() => onView(file._id)}
          className="text-xs px-3 py-1.5 bg-[#f3f4f6] text-[#3f4a8a] rounded-md hover:bg-[#e5e7eb] transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onAnalyze(file._id)}
          className="text-xs px-3 py-1.5 bg-[#effcf1] text-[#39b54b] rounded-md hover:bg-[#dcf5e0] transition-colors"
        >
          Analyze
        </button>
        <button
          onClick={() => onDelete(file._id)}
          className="text-xs px-3 py-1.5 bg-[#fef3e8] text-[#f59e0b] rounded-md hover:bg-[#fde7cc] transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default function Dashboard({ token, user }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    
    fetchFiles();
  }, [token, navigate]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await getUserFiles(token);
      setFiles(response.data.files || []);
    } catch (err) {
      console.error('Error fetching files:', err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError('');
    setUploadProgress(0);
    
    const file = e.target.excelFile.files[0];
    if (!file) {
      setUploadError('Please select a file to upload');
      return;
    }
    
    // Validate file type and size
    const validTypes = ['.xlsx', '.xls', '.csv'];
    const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!validTypes.includes(fileExtension)) {
      setUploadError('Only Excel (.xlsx, .xls) or CSV (.csv) files are allowed.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit.');
      return;
    }

    setUploading(true);
    try {
      await uploadFile(file, token, (progressEvent) => {
        if (progressEvent && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      e.target.reset();
      fetchFiles();
    } catch (err) {
      setUploadError(err?.response?.data?.message || 'Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleViewFile = (fileId) => {
    navigate(`/files/${fileId}`);
  };

  const handleAnalyzeFile = (fileId) => {
    navigate(`/analysis/${fileId}`);
  };

  const handleDeleteFile = async (fileId) => {
    if (window.confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
      try {
        await deleteFile(fileId, token);
        fetchFiles();
      } catch (err) {
        console.error('Error deleting file:', err);
        alert('Failed to delete file. Please try again.');
      }
    }
  };
  
  // Filter files based on search query
  const filteredFiles = files.filter((file) => 
    file.filename.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white shadow-sm rounded-lg border border-[#e5e7eb] p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1f2937]">Excel Analytics Dashboard</h1>
              <p className="mt-2 text-[#6b7280]">
                Welcome back{user?.name ? `, ${user.name}` : ''}! Upload, view, and analyze your Excel files.
              </p>
            </div>
            
            <div className="w-full lg:w-auto">
              <form onSubmit={handleUpload} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:w-auto">
                  <input
                    type="file"
                    id="excelFile"
                    name="excelFile"
                    accept=".xlsx,.xls,.csv"
                    className="hidden"
                    onChange={() => setUploadError('')}
                    disabled={uploading}
                  />
                  <label
                    htmlFor="excelFile"
                    className={`flex items-center px-4 py-2.5 bg-white border border-[#e5e7eb] rounded-lg cursor-pointer hover:bg-[#f9fafb] w-full sm:w-auto ${
                      uploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <svg className="w-5 h-5 mr-2 text-[#6b7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Choose File</span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={uploading}
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-lg ${
                    uploading
                      ? 'bg-[#9ca3af] cursor-not-allowed'
                      : 'bg-[#39b54b] hover:bg-[#2a9939] text-white'
                  }`}
                >
                  {uploading ? `Uploading (${uploadProgress}%)` : 'Upload'}
                </button>
              </form>
              
              {uploadError && (
                <div className="mt-2 text-sm text-red-600">{uploadError}</div>
              )}
            </div>
          </div>
        </div>

        {/* Search and Stats Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="stats flex flex-wrap gap-4 text-sm">
            <div className="stat bg-white p-3 rounded-lg border border-[#e5e7eb] shadow-sm">
              <span className="text-[#6b7280]">Total Files:</span>
              <span className="ml-2 font-medium text-[#1f2937]">{files.length}</span>
            </div>
            {files.length > 0 && (
              <div className="stat bg-white p-3 rounded-lg border border-[#e5e7eb] shadow-sm">
                <span className="text-[#6b7280]">Total Size:</span>
                <span className="ml-2 font-medium text-[#1f2937]">
                  {Math.round(files.reduce((acc, file) => acc + file.size, 0) / 1024)} KB
                </span>
              </div>
            )}
          </div>
          
          <div className="search-bar relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search files..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39b54b] focus:border-transparent"
            />
            <svg 
              className="w-5 h-5 absolute right-3 top-3 text-[#6b7280]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#39b54b]"></div>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-lg border border-[#e5e7eb] overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e5e7eb]">
              <h2 className="text-lg font-medium text-[#1f2937]">Your Excel Files</h2>
              <p className="mt-1 text-sm text-[#6b7280]">
                {filteredFiles.length === 0 && filterQuery
                  ? 'No matching files found. Try a different search term.'
                  : filteredFiles.length === 0
                  ? 'You have no files yet. Upload an Excel file to get started.'
                  : `Showing ${filteredFiles.length} of ${files.length} file${files.length === 1 ? '' : 's'}.`}
              </p>
            </div>
            
            {filteredFiles.length > 0 && (
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredFiles.map((file) => (
                    <FileCard
                      key={file._id}
                      file={file}
                      onView={handleViewFile}
                      onAnalyze={handleAnalyzeFile}
                      onDelete={handleDeleteFile}
                    />
                  ))}
                </div>
              </div>
            )}
            
            
            {filteredFiles.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-[#f9fafb] p-6 rounded-xl border border-dashed border-[#e5e7eb] max-w-md w-full">
                  <div className="text-center">
                    <svg className="mx-auto h-16 w-16 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-[#1f2937]">No files found</h3>
                    {filterQuery ? (
                      <p className="mt-2 text-sm text-[#6b7280]">
                        No files match your search. Try different keywords or clear the search.
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-[#6b7280]">
                        Upload Excel or CSV files to analyze and visualize your data.
                      </p>
                    )}
                    <div className="mt-6 flex justify-center">
                      {filterQuery ? (
                        <button
                          onClick={() => setFilterQuery('')}
                          className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3f4a8a] hover:bg-[#2f3b7a]"
                        >
                          Clear Search
                        </button>
                      ) : (
                        <label
                          htmlFor="empty-upload"
                          className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#39b54b] hover:bg-[#2a9939] cursor-pointer"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                          Upload a file
                          <input
                            id="empty-upload"
                            name="empty-upload"
                            type="file"
                            className="sr-only"
                            accept=".xlsx,.xls,.csv"
                            onChange={(e) => {
                              if (e.target.files[0]) {
                                document.getElementById('excelFile').files = e.target.files;
                                document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }));
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Quick Help Panel */}
        <div className="mt-8 bg-white shadow-sm rounded-lg border border-[#e5e7eb] overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e5e7eb]">
            <h2 className="text-lg font-medium text-[#1f2937]">Quick Tips</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#f3f8ff] p-4 rounded-lg border border-[#e0eaff]">
                <h3 className="font-medium text-[#3f4a8a] mb-2">File Requirements</h3>
                <ul className="text-sm text-[#6b7280] space-y-1">
                  <li>• Excel or CSV format</li>
                  <li>• Maximum size: 10MB</li>
                  <li>• First row as headers</li>
                </ul>
              </div>
              <div className="bg-[#effcf1] p-4 rounded-lg border border-[#dcf5e0]">
                <h3 className="font-medium text-[#39b54b] mb-2">Analyze Features</h3>
                <ul className="text-sm text-[#6b7280] space-y-1">
                  <li>• Interactive data charts</li>
                  <li>• Statistical analysis</li>
                  <li>• Export as PDF/PNG</li>
                </ul>
              </div>
              <div className="bg-[#fef3e8] p-4 rounded-lg border border-[#fde7cc]">
                <h3 className="font-medium text-[#f59e0b] mb-2">Need Help?</h3>
                <ul className="text-sm text-[#6b7280] space-y-1">
                  <li>• Visit the Documentation page</li>
                  <li>• Check Troubleshooting section</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
