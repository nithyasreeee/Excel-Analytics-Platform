import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFileData } from '../api';

export default function FileDetails({ token }) {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSheet, setActiveSheet] = useState('');
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const res = await getFileData(fileId, token);
        setFileData(res.data);
        
        // Set the first sheet as active
        if (res.data && res.data.sheets && res.data.sheets.length > 0) {
          setActiveSheet(res.data.sheets[0].name);
          
          // Set all columns as visible initially
          if (res.data.sheets[0].columns) {
            setVisibleColumns(res.data.sheets[0].columns);
          }
        }
      } catch (err) {
        setError('Failed to load file data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fileId, token, navigate]);

  const handleSheetChange = (sheetName) => {
    setActiveSheet(sheetName);
    // Update visible columns for the new sheet
    const sheet = fileData.sheets.find(s => s.name === sheetName);
    if (sheet && sheet.columns) {
      setVisibleColumns(sheet.columns);
    }
    setPage(1);
  };

  const handleColumnToggle = (column) => {
    if (visibleColumns.includes(column)) {
      setVisibleColumns(visibleColumns.filter(col => col !== column));
    } else {
      setVisibleColumns([...visibleColumns, column]);
    }
  };

  const filteredData = React.useMemo(() => {
    if (!fileData || !activeSheet) return [];
    
    const activeSheetData = fileData.sheets.find(s => s.name === activeSheet);
    if (!activeSheetData || !activeSheetData.data) return [];
    
    return activeSheetData.data.filter(row => {
      if (!searchTerm) return true;
      return Object.values(row).some(value => 
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [fileData, activeSheet, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage, 
    page * rowsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fafb] pt-20 px-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#39b54b]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f9fafb] pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#fff0e0] border border-[#f59e0b] text-[#7c3c00] p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error}</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="mt-4 bg-[#3f4a8a] text-white px-4 py-2 rounded-md hover:bg-[#34406f] transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!fileData) {
    return (
      <div className="min-h-screen bg-[#f9fafb] pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#fff0e0] border border-[#f59e0b] text-[#7c3c00] p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">No Data Found</h2>
            <p>We couldn't find any data for this file.</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="mt-4 bg-[#3f4a8a] text-white px-4 py-2 rounded-md hover:bg-[#34406f] transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1f2937]">{fileData.filename}</h1>
            <p className="text-[#6b7280] mt-1">
              {fileData.metadata?.totalRows} rows • {fileData.metadata?.totalColumns} columns • {fileData.metadata?.fileSize}
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-[#3f4a8a] hover:text-[#34406f] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-[#e5e7eb] overflow-hidden mb-6">
          <div className="flex flex-wrap border-b border-[#e5e7eb]">
            {fileData.sheets && fileData.sheets.map((sheet) => (
              <button
                key={sheet.name}
                className={`py-3 px-6 focus:outline-none ${
                  activeSheet === sheet.name 
                    ? 'bg-[#3f4a8a] text-white font-medium' 
                    : 'text-[#1f2937] hover:bg-[#f9fafb] transition-colors'
                }`}
                onClick={() => handleSheetChange(sheet.name)}
              >
                {sheet.name}
              </button>
            ))}
          </div>

          <div className="p-4 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f4a8a]"
                  placeholder="Search in data..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                />
                <div className="absolute left-3 top-2.5 text-[#6b7280]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <button
                className="inline-flex items-center px-4 py-2 border border-[#e5e7eb] rounded-lg text-[#1f2937] bg-white hover:bg-[#f9fafb] transition-colors"
                onClick={() => {
                  const sheet = fileData.sheets.find(s => s.name === activeSheet);
                  if (sheet && sheet.columns) {
                    setVisibleColumns([...sheet.columns]);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
                Columns
              </button>
            </div>
            <div>
              <button
                className="inline-flex items-center px-4 py-2 bg-[#39b54b] text-white rounded-lg hover:bg-[#2a9939] transition-colors"
                onClick={() => navigate(`/analysis/${fileId}`)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Analyze Data
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#e5e7eb]">
              <thead className="bg-[#f9fafb]">
                <tr>
                  {visibleColumns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#e5e7eb]">
                {paginatedData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-[#f9fafb] transition-colors">
                    {visibleColumns.map((column, colIndex) => (
                      <td
                        key={`${rowIndex}-${colIndex}`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-[#1f2937]"
                      >
                        {row[column] !== undefined ? row[column].toString() : ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 flex items-center justify-between border-t border-[#e5e7eb]">
              <div className="text-sm text-[#6b7280]">
                Showing {Math.min(filteredData.length, (page - 1) * rowsPerPage + 1)} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} results
              </div>
              <nav className="flex items-center">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-[#e5e7eb] bg-white text-sm font-medium ${
                    page === 1 ? 'text-[#d1d5db] cursor-not-allowed' : 'text-[#6b7280] hover:bg-[#f9fafb]'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border-t border-b border-[#e5e7eb] bg-white text-sm font-medium text-[#6b7280]">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-[#e5e7eb] bg-white text-sm font-medium ${
                    page === totalPages ? 'text-[#d1d5db] cursor-not-allowed' : 'text-[#6b7280] hover:bg-[#f9fafb]'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
