import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFileData, createAnalysis, getAnalysisResults, getAnalysisSummary } from '../api';

export default function AnalysisResults({ token }) {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [analysisType, setAnalysisType] = useState('summary');
  const [selectedSheet, setSelectedSheet] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [runningAnalysis, setRunningAnalysis] = useState(false);
  const [availableAnalyses, setAvailableAnalyses] = useState([]);
  const [savedAnalysisId, setSavedAnalysisId] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const res = await getFileData(fileId, token);
        setFile(res.data);
        
        // Set default selected sheet
        if (res.data && res.data.sheets && res.data.sheets.length > 0) {
          setSelectedSheet(res.data.sheets[0].name);
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

  const handleSheetChange = (e) => {
    setSelectedSheet(e.target.value);
    setSelectedColumns([]);
    setAnalysisResults(null);
  };

  const handleColumnToggle = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter(col => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleAnalysisTypeChange = (type) => {
    setAnalysisType(type);
    setAnalysisResults(null);
  };

  const runAnalysis = async () => {
    if (selectedColumns.length === 0) {
      setError('Please select at least one column for analysis.');
      return;
    }

    try {
      setRunningAnalysis(true);
      setError('');

      const analysisConfig = {
        fileId,
        sheetName: selectedSheet,
        columns: selectedColumns,
        analysisType
      };

      const res = await createAnalysis(analysisConfig, token);
      setAnalysisResults(res.data.results);
      setSavedAnalysisId(res.data.analysisId);
      
      // Update available analyses
      setAvailableAnalyses(prev => [...prev, {
        id: res.data.analysisId,
        type: analysisType,
        timestamp: new Date().toISOString()
      }]);
    } catch (err) {
      setError('Failed to run analysis. Please try again.');
      console.error(err);
    } finally {
      setRunningAnalysis(false);
    }
  };

  const loadSavedAnalysis = async (analysisId) => {
    try {
      setRunningAnalysis(true);
      const res = await getAnalysisResults(analysisId, token);
      setAnalysisResults(res.data.results);
      setSavedAnalysisId(analysisId);
      
      // Set the analysis type based on the saved analysis
      const analysis = availableAnalyses.find(a => a.id === analysisId);
      if (analysis) {
        setAnalysisType(analysis.type);
      }
    } catch (err) {
      setError('Failed to load saved analysis. Please try again.');
      console.error(err);
    } finally {
      setRunningAnalysis(false);
    }
  };

  const renderChart = () => {
    if (!analysisResults) return null;

    switch (analysisType) {
      case 'summary':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
            <h3 className="text-xl font-semibold mb-4 text-[#1f2937]">Data Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(analysisResults).map(([column, stats]) => (
                <div key={column} className="bg-[#f9fafb] p-4 rounded-lg border border-[#e5e7eb]">
                  <h4 className="font-medium text-[#3f4a8a] mb-2">{column}</h4>
                  <div className="space-y-2">
                    {Object.entries(stats).map(([stat, value]) => (
                      <div key={stat} className="flex justify-between">
                        <span className="text-[#6b7280]">{stat}:</span>
                        <span className="font-medium text-[#1f2937]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'correlation':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
            <h3 className="text-xl font-semibold mb-4 text-[#1f2937]">Correlation Analysis</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#e5e7eb]">
                <thead className="bg-[#f9fafb]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider"></th>
                    {selectedColumns.map((col) => (
                      <th key={col} className="px-6 py-3 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#e5e7eb]">
                  {selectedColumns.map((row) => (
                    <tr key={row}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1f2937]">{row}</td>
                      {selectedColumns.map((col) => (
                        <td key={`${row}-${col}`} className="px-6 py-4 whitespace-nowrap text-sm text-[#1f2937]">
                          {analysisResults[row]?.[col] !== undefined 
                            ? parseFloat(analysisResults[row][col]).toFixed(4) 
                            : 'N/A'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'regression':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
            <h3 className="text-xl font-semibold mb-4 text-[#1f2937]">Regression Analysis</h3>
            <div className="space-y-6">
              <div className="bg-[#f9fafb] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#3f4a8a] mb-2">Model Summary</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">R-squared:</span>
                    <span className="font-medium text-[#1f2937]">{analysisResults.r_squared.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Adjusted R-squared:</span>
                    <span className="font-medium text-[#1f2937]">{analysisResults.adjusted_r_squared.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">F-statistic:</span>
                    <span className="font-medium text-[#1f2937]">{analysisResults.f_statistic.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">p-value:</span>
                    <span className="font-medium text-[#1f2937]">{analysisResults.p_value.toExponential(4)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#f9fafb] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#3f4a8a] mb-2">Coefficients</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#e5e7eb]">
                    <thead className="bg-white">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">Variable</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">Coefficient</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">Std Error</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">t-value</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">p-value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e7eb]">
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-[#1f2937]">Intercept</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#1f2937]">{analysisResults.coefficients.intercept.toFixed(4)}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#1f2937]">{analysisResults.std_errors.intercept.toFixed(4)}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#1f2937]">{analysisResults.t_values.intercept.toFixed(4)}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#1f2937]">{analysisResults.p_values.intercept.toExponential(4)}</td>
                      </tr>
                      {Object.keys(analysisResults.coefficients).filter(k => k !== 'intercept').map((variable) => (
                        <tr key={variable}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-[#1f2937]">{variable}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-[#1f2937]">{analysisResults.coefficients[variable].toFixed(4)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-[#1f2937]">{analysisResults.std_errors[variable].toFixed(4)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-[#1f2937]">{analysisResults.t_values[variable].toFixed(4)}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-[#1f2937]">{analysisResults.p_values[variable].toExponential(4)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#f9fafb] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#3f4a8a] mb-2">Equation</h4>
                <div className="p-4 bg-white rounded border border-[#e5e7eb] font-mono text-sm overflow-x-auto">
                  <p>
                    y = {analysisResults.coefficients.intercept.toFixed(4)} 
                    {Object.entries(analysisResults.coefficients)
                      .filter(([key]) => key !== 'intercept')
                      .map(([key, value]) => (
                        ` ${value >= 0 ? '+' : ''} ${value.toFixed(4)} × ${key}`
                      ))
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'clusters':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
            <h3 className="text-xl font-semibold mb-4 text-[#1f2937]">Cluster Analysis</h3>
            <div className="space-y-6">
              <div className="bg-[#f9fafb] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#3f4a8a] mb-2">Cluster Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Number of clusters:</span>
                    <span className="font-medium text-[#1f2937]">{analysisResults.num_clusters}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6b7280]">Silhouette score:</span>
                    <span className="font-medium text-[#1f2937]">{analysisResults.silhouette_score.toFixed(4)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#f9fafb] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#3f4a8a] mb-2">Cluster Centers</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#e5e7eb]">
                    <thead className="bg-white">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">Cluster</th>
                        {selectedColumns.map((column) => (
                          <th key={column} className="px-4 py-2 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e7eb]">
                      {analysisResults.cluster_centers.map((center, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-[#1f2937]">Cluster {idx + 1}</td>
                          {selectedColumns.map((column, colIdx) => (
                            <td key={colIdx} className="px-4 py-2 whitespace-nowrap text-sm text-[#1f2937]">{center[colIdx].toFixed(4)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-[#f9fafb] p-4 rounded-lg border border-[#e5e7eb]">
                <h4 className="font-medium text-[#3f4a8a] mb-2">Cluster Distribution</h4>
                <div className="h-64">
                  {/* Placeholder for chart */}
                  <div className="flex h-full items-center justify-center bg-white border border-[#e5e7eb] rounded-lg">
                    <div className="text-center text-[#6b7280]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#3f4a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p className="mt-2">Cluster distribution visualization would appear here</p>
                      <p className="text-xs mt-1">Implementation requires Chart.js integration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
            <p className="text-[#6b7280]">Select an analysis type and run the analysis to see results.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fafb] pt-20 px-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#39b54b]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1f2937]">Data Analysis</h1>
            <p className="text-[#6b7280] mt-1">
              {file && file.filename ? file.filename : 'Analyze your Excel data'}
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate(`/file/${fileId}`)}
              className="flex items-center text-[#3f4a8a] hover:text-[#34406f] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to File Details
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-[#fff0e0] border border-[#f59e0b] rounded-lg">
            <p className="text-[#7c3c00]">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analysis Configuration Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg border border-[#e5e7eb] p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#1f2937]">Analysis Settings</h2>
              
              {/* Sheet Selection */}
              <div className="mb-4">
                <label htmlFor="sheet" className="block text-sm font-medium text-[#6b7280] mb-1">Select Sheet</label>
                <select
                  id="sheet"
                  value={selectedSheet}
                  onChange={handleSheetChange}
                  className="w-full border border-[#e5e7eb] rounded-md py-2 px-3 text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#3f4a8a] focus:border-transparent"
                >
                  {file && file.sheets && file.sheets.map((sheet) => (
                    <option key={sheet.name} value={sheet.name}>
                      {sheet.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Column Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#6b7280] mb-2">Select Columns for Analysis</label>
                <div className="max-h-48 overflow-y-auto border border-[#e5e7eb] rounded-md p-2">
                  {file && file.sheets && selectedSheet && (
                    file.sheets.find(s => s.name === selectedSheet)?.columns.map((column) => (
                      <div key={column} className="flex items-center mb-2">
                        <input
                          id={`column-${column}`}
                          type="checkbox"
                          checked={selectedColumns.includes(column)}
                          onChange={() => handleColumnToggle(column)}
                          className="h-4 w-4 text-[#39b54b] focus:ring-[#39b54b] border-[#e5e7eb] rounded"
                        />
                        <label htmlFor={`column-${column}`} className="ml-2 block text-sm text-[#1f2937]">
                          {column}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Analysis Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#6b7280] mb-2">Analysis Type</label>
                <div className="space-y-2">
                  {['summary', 'correlation', 'regression', 'clusters'].map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        id={`type-${type}`}
                        type="radio"
                        name="analysisType"
                        value={type}
                        checked={analysisType === type}
                        onChange={() => handleAnalysisTypeChange(type)}
                        className="h-4 w-4 text-[#39b54b] focus:ring-[#39b54b] border-[#e5e7eb]"
                      />
                      <label htmlFor={`type-${type}`} className="ml-2 block text-sm text-[#1f2937] capitalize">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Run Analysis Button */}
              <button
                onClick={runAnalysis}
                disabled={runningAnalysis || selectedColumns.length === 0}
                className={`w-full py-2 px-4 rounded-md flex items-center justify-center ${
                  runningAnalysis || selectedColumns.length === 0
                    ? 'bg-[#d1d5db] cursor-not-allowed text-[#6b7280]'
                    : 'bg-[#39b54b] text-white hover:bg-[#2a9939]'
                } transition-colors`}
              >
                {runningAnalysis ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running Analysis...
                  </>
                ) : 'Run Analysis'}
              </button>
              
              {/* Previously Run Analyses */}
              {availableAnalyses.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-[#6b7280] mb-2">Previously Run Analyses</h3>
                  <div className="space-y-2">
                    {availableAnalyses.map((analysis) => (
                      <button
                        key={analysis.id}
                        onClick={() => loadSavedAnalysis(analysis.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                          savedAnalysisId === analysis.id
                            ? 'bg-[#3f4a8a] text-white'
                            : 'bg-[#f9fafb] text-[#1f2937] hover:bg-[#f0f2f9]'
                        } transition-colors`}
                      >
                        <div className="font-medium capitalize">{analysis.type} Analysis</div>
                        <div className="text-xs mt-1 opacity-70">
                          {new Date(analysis.timestamp).toLocaleDateString()} {new Date(analysis.timestamp).toLocaleTimeString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Analysis Results Panel */}
          <div className="lg:col-span-2">
            {runningAnalysis ? (
              <div className="bg-white shadow-sm rounded-lg border border-[#e5e7eb] p-6 flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#39b54b] mx-auto"></div>
                  <p className="mt-4 text-[#6b7280]">Running analysis...</p>
                </div>
              </div>
            ) : analysisResults ? (
              renderChart()
            ) : (
              <div className="bg-white shadow-sm rounded-lg border border-[#e5e7eb] p-6 h-64 flex items-center justify-center">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#e5e7eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-[#1f2937]">No Analysis Results Yet</h3>
                  <p className="mt-2 text-[#6b7280]">
                    Select columns and an analysis type, then click "Run Analysis" to see insights about your data.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
