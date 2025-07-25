import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('getting-started');

  // List of documentation topics
  const topics = [
    { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
    { id: 'uploading-files', title: 'Uploading Files', icon: '📤' },
    { id: 'data-analysis', title: 'Data Analysis', icon: '📊' },
    { id: 'visualizations', title: 'Visualizations', icon: '📈' },
    { id: 'export-options', title: 'Export Options', icon: '📁' },
    { id: 'api-integration', title: 'API Integration', icon: '🔌' },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: '🔧' },
    { id: 'faqs', title: 'Frequently Asked Questions', icon: '❓' }
  ];

  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">Getting Started with Excel Analytics Platform</h2>
            <p className="mb-4 text-[#1f2937]">
              Welcome to the Excel Analytics Platform! This powerful tool helps you analyze, visualize, and extract insights from your Excel data with just a few clicks.
            </p>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#1f2937] mb-4">
              <li>Upload and analyze Excel files (XLSX, XLS, CSV)</li>
              <li>Generate statistical summaries automatically</li>
              <li>Create beautiful visualizations with one click</li>
              <li>Run advanced analytics like regression and clustering</li>
              <li>Export results in multiple formats</li>
              <li>Share insights with your team</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Quick Start Guide</h3>
            <ol className="list-decimal pl-6 space-y-3 text-[#1f2937]">
              <li>
                <strong>Create an account</strong> - Sign up with your email or connect with Google.
              </li>
              <li>
                <strong>Upload a file</strong> - Drag and drop your Excel file or use the file picker.
              </li>
              <li>
                <strong>Explore data</strong> - View your data and get automatic insights.
              </li>
              <li>
                <strong>Analyze deeper</strong> - Use the analysis tools to gain deeper insights.
              </li>
              <li>
                <strong>Export and share</strong> - Download your results or share with colleagues.
              </li>
            </ol>
            
            <div className="mt-8 p-4 bg-[#edf7ed] border border-[#39b54b] rounded-lg">
              <h4 className="font-medium text-[#246626] mb-2">Pro Tip</h4>
              <p className="text-[#246626]">
                Check out our <Link to="/documentation/tutorials" className="underline hover:text-[#39b54b]">video tutorials</Link> for step-by-step guidance on getting the most out of the platform.
              </p>
            </div>
          </div>
        );
      
      case 'uploading-files':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">Uploading Files</h2>
            <p className="mb-4 text-[#1f2937]">
              The Excel Analytics Platform supports various file formats and provides multiple ways to upload your data.
            </p>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Supported File Formats</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#1f2937] mb-4">
              <li><strong>Excel files</strong> (.xlsx, .xls) - Full support for all Excel features</li>
              <li><strong>CSV files</strong> (.csv) - Comma-separated values</li>
              <li><strong>TSV files</strong> (.tsv) - Tab-separated values</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Upload Methods</h3>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Drag and Drop</h4>
                <p className="text-[#6b7280]">
                  Simply drag your file from your computer and drop it in the upload area on the dashboard.
                </p>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">File Browser</h4>
                <p className="text-[#6b7280]">
                  Click the "Browse" button to open your computer's file explorer and select a file.
                </p>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Copy & Paste</h4>
                <p className="text-[#6b7280]">
                  Copy data from Excel and paste it directly into the platform's data editor.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">File Size Limits</h3>
            <p className="mb-4 text-[#1f2937]">
              The platform supports files up to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#1f2937] mb-4">
              <li><strong>Free plan:</strong> Up to 5MB per file, 10 files total</li>
              <li><strong>Pro plan:</strong> Up to 50MB per file, unlimited files</li>
              <li><strong>Enterprise plan:</strong> Up to 500MB per file, unlimited files</li>
            </ul>
            
            <div className="mt-8 p-4 bg-[#fff0e0] border border-[#f59e0b] rounded-lg">
              <h4 className="font-medium text-[#7c3c00] mb-2">Important Note</h4>
              <p className="text-[#7c3c00]">
                For best performance, ensure your Excel files have clean headers in the first row and no merged cells.
              </p>
            </div>
          </div>
        );
      
      case 'data-analysis':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">Data Analysis Tools</h2>
            <p className="mb-4 text-[#1f2937]">
              Our platform offers a comprehensive suite of analysis tools to help you extract valuable insights from your data.
            </p>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Summary Statistics</h3>
            <p className="mb-4 text-[#1f2937]">
              Get a quick overview of your data with automatically generated summary statistics:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#1f2937] mb-4">
              <li>Mean, median, mode</li>
              <li>Standard deviation and variance</li>
              <li>Minimum and maximum values</li>
              <li>Quartiles and interquartile range</li>
              <li>Missing value counts</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Correlation Analysis</h3>
            <p className="mb-4 text-[#1f2937]">
              Understand relationships between variables with correlation analysis:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#1f2937] mb-4">
              <li>Pearson correlation coefficients</li>
              <li>Spearman rank correlation</li>
              <li>Correlation heatmaps</li>
              <li>P-value calculations</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Regression Analysis</h3>
            <p className="mb-4 text-[#1f2937]">
              Predict outcomes and understand variable relationships:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#1f2937] mb-4">
              <li>Linear regression</li>
              <li>Multiple regression</li>
              <li>Coefficient analysis</li>
              <li>R-squared and adjusted R-squared</li>
              <li>Residual analysis</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Cluster Analysis</h3>
            <p className="mb-4 text-[#1f2937]">
              Group similar data points to discover patterns:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#1f2937] mb-4">
              <li>K-means clustering</li>
              <li>Hierarchical clustering</li>
              <li>Cluster visualization</li>
              <li>Silhouette analysis</li>
            </ul>
            
            <div className="mt-8 p-4 bg-[#edf7ed] border border-[#39b54b] rounded-lg">
              <h4 className="font-medium text-[#246626] mb-2">Pro Tip</h4>
              <p className="text-[#246626]">
                Use our "Analysis Wizard" feature to get recommendations on which analysis methods are most appropriate for your data type.
              </p>
            </div>
          </div>
        );
      
      case 'visualizations':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">Data Visualizations</h2>
            <p className="mb-4 text-[#1f2937]">
              Transform your data into powerful visual insights with our comprehensive visualization tools.
            </p>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Chart Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Bar Charts</h4>
                <p className="text-[#6b7280]">
                  Compare values across categories with horizontal or vertical bars.
                </p>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Line Charts</h4>
                <p className="text-[#6b7280]">
                  Show trends over time or continuous data sets.
                </p>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Pie & Donut Charts</h4>
                <p className="text-[#6b7280]">
                  Display proportions and percentages of categorical data.
                </p>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Scatter Plots</h4>
                <p className="text-[#6b7280]">
                  Visualize relationships between two variables.
                </p>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Heatmaps</h4>
                <p className="text-[#6b7280]">
                  Display correlation matrices and density distributions.
                </p>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Box Plots</h4>
                <p className="text-[#6b7280]">
                  Show distribution, median, and outliers in your data.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Customization Options</h3>
            <p className="mb-4 text-[#1f2937]">
              Make your visualizations match your needs with extensive customization:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#1f2937] mb-4">
              <li>Color schemes and palettes</li>
              <li>Axis labels and titles</li>
              <li>Legend positioning</li>
              <li>Data point styling</li>
              <li>Background and grid options</li>
              <li>Animation and interactivity</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Interactive Features</h3>
            <p className="mb-4 text-[#1f2937]">
              Our visualizations aren't just static images - they're interactive tools:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#1f2937] mb-4">
              <li>Hover tooltips for detailed information</li>
              <li>Click to filter data</li>
              <li>Zoom and pan capabilities</li>
              <li>Dynamic resizing</li>
              <li>Real-time data updates</li>
            </ul>
            
            <div className="mt-8 p-4 bg-[#edf7ed] border border-[#39b54b] rounded-lg">
              <h4 className="font-medium text-[#246626] mb-2">Pro Tip</h4>
              <p className="text-[#246626]">
                Use the "Chart Recommendation" feature to automatically get the best visualization type for your specific data structure.
              </p>
            </div>
          </div>
        );
      
      case 'export-options':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">Export Options</h2>
            <p className="mb-4 text-[#1f2937]">
              After analyzing your data, you can export your results in multiple formats for sharing or further processing.
            </p>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Available Export Formats</h3>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Excel (.xlsx)</h4>
                <p className="text-[#6b7280]">
                  Export complete analysis results with formatting, formulas, and multiple sheets.
                </p>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">CSV (.csv)</h4>
                <p className="text-[#6b7280]">
                  Simple comma-separated values format for universal compatibility.
                </p>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">PDF Report (.pdf)</h4>
                <p className="text-[#6b7280]">
                  Professional reports with visualizations, insights, and analysis summaries.
                </p>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Images (.png, .jpg, .svg)</h4>
                <p className="text-[#6b7280]">
                  High-resolution images of individual charts and visualizations.
                </p>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">JSON (.json)</h4>
                <p className="text-[#6b7280]">
                  Structured data format for developers and API integrations.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Sharing Options</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#1f2937] mb-4">
              <li><strong>Direct download</strong> - Save files directly to your device</li>
              <li><strong>Email</strong> - Send results to any email address</li>
              <li><strong>Share links</strong> - Generate shareable links with optional password protection</li>
              <li><strong>Scheduled reports</strong> - Set up automated exports on a schedule (Pro plan only)</li>
              <li><strong>Cloud storage</strong> - Export directly to Google Drive, Dropbox, or OneDrive</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Export Customization</h3>
            <p className="mb-4 text-[#1f2937]">
              Customize your exports to include exactly what you need:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#1f2937] mb-4">
              <li>Select specific sheets or data sections</li>
              <li>Include or exclude visualizations</li>
              <li>Add custom headers, footers, and branding</li>
              <li>Choose compression options</li>
              <li>Set image resolution and quality</li>
            </ul>
            
            <div className="mt-8 p-4 bg-[#fff0e0] border border-[#f59e0b] rounded-lg">
              <h4 className="font-medium text-[#7c3c00] mb-2">Important Note</h4>
              <p className="text-[#7c3c00]">
                Free plan users can export up to 5 files per day. Pro and Enterprise plans have unlimited exports.
              </p>
            </div>
          </div>
        );
      
      case 'api-integration':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">API Integration</h2>
            <p className="mb-4 text-[#1f2937]">
              Integrate the Excel Analytics Platform with your own applications using our comprehensive API.
            </p>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">API Overview</h3>
            <p className="mb-4 text-[#1f2937]">
              Our RESTful API allows you to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#1f2937] mb-4">
              <li>Upload files programmatically</li>
              <li>Run analyses on data</li>
              <li>Retrieve analysis results</li>
              <li>Generate visualizations</li>
              <li>Manage user accounts and permissions</li>
              <li>Schedule automated tasks</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Getting Started with the API</h3>
            <ol className="list-decimal pl-6 space-y-3 text-[#1f2937] mb-6">
              <li>
                <strong>Get your API key</strong> - Generate an API key in your account settings.
              </li>
              <li>
                <strong>Review the documentation</strong> - Browse our comprehensive API docs.
              </li>
              <li>
                <strong>Make your first request</strong> - Test the API with our interactive console.
              </li>
              <li>
                <strong>Implement in your application</strong> - Use our client libraries or direct HTTP requests.
              </li>
            </ol>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Sample API Request</h3>
            <div className="bg-[#1f2937] text-white p-4 rounded-lg overflow-x-auto mb-6">
              <pre className="text-sm">
{`# Python example using requests
import requests

API_KEY = "your_api_key_here"
API_URL = "https://api.excelanalytics.com/v1"

# Upload a file
with open("data.xlsx", "rb") as file:
    response = requests.post(
        f"{API_URL}/files/upload",
        headers={"Authorization": f"Bearer {API_KEY}"},
        files={"file": file}
    )
    
file_id = response.json()["fileId"]

# Run summary analysis
analysis_response = requests.post(
    f"{API_URL}/analysis/summary",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={"fileId": file_id}
)

print(analysis_response.json())`}
              </pre>
            </div>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Available Client Libraries</h3>
            <ul className="list-disc pl-6 space-y-2 text-[#1f2937] mb-4">
              <li><strong>Python</strong> - <code className="bg-[#f9fafb] px-2 py-1 rounded">pip install excel-analytics-client</code></li>
              <li><strong>JavaScript/Node.js</strong> - <code className="bg-[#f9fafb] px-2 py-1 rounded">npm install excel-analytics-client</code></li>
              <li><strong>Java</strong> - Available via Maven Central</li>
              <li><strong>Ruby</strong> - Available via RubyGems</li>
              <li><strong>PHP</strong> - Available via Composer</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Rate Limits</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-[#e5e7eb]">
                <thead className="bg-[#f9fafb]">
                  <tr>
                    <th className="py-2 px-4 border-b border-[#e5e7eb] text-left text-sm font-medium text-[#6b7280]">Plan</th>
                    <th className="py-2 px-4 border-b border-[#e5e7eb] text-left text-sm font-medium text-[#6b7280]">Requests per Minute</th>
                    <th className="py-2 px-4 border-b border-[#e5e7eb] text-left text-sm font-medium text-[#6b7280]">Requests per Day</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-[#e5e7eb] text-sm text-[#1f2937]">Free</td>
                    <td className="py-2 px-4 border-b border-[#e5e7eb] text-sm text-[#1f2937]">10</td>
                    <td className="py-2 px-4 border-b border-[#e5e7eb] text-sm text-[#1f2937]">500</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-[#e5e7eb] text-sm text-[#1f2937]">Pro</td>
                    <td className="py-2 px-4 border-b border-[#e5e7eb] text-sm text-[#1f2937]">60</td>
                    <td className="py-2 px-4 border-b border-[#e5e7eb] text-sm text-[#1f2937]">5,000</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-[#e5e7eb] text-sm text-[#1f2937]">Enterprise</td>
                    <td className="py-2 px-4 border-b border-[#e5e7eb] text-sm text-[#1f2937]">300</td>
                    <td className="py-2 px-4 border-b border-[#e5e7eb] text-sm text-[#1f2937]">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 p-4 bg-[#edf7ed] border border-[#39b54b] rounded-lg">
              <h4 className="font-medium text-[#246626] mb-2">Pro Tip</h4>
              <p className="text-[#246626]">
                For high-volume API usage, consider implementing exponential backoff and request batching to optimize your integration.
              </p>
            </div>
          </div>
        );
        
      case 'troubleshooting':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">Troubleshooting Guide</h2>
            <p className="mb-4 text-[#1f2937]">
              Encountering issues with the Excel Analytics Platform? Here are solutions to common problems.
            </p>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Login Issues</h3>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Can't Log In</h4>
                <p className="text-[#6b7280] mb-2">
                  If you're having trouble logging in, try these steps:
                </p>
                <ol className="list-decimal pl-6 space-y-1 text-[#6b7280]">
                  <li>Reset your password using the "Forgot Password" link</li>
                  <li>Clear your browser cache and cookies</li>
                  <li>Try using a different browser or device</li>
                  <li>Verify your email address is correctly entered</li>
                </ol>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Not Redirecting After Login</h4>
                <p className="text-[#6b7280] mb-2">
                  If you're not redirected to the dashboard after logging in:
                </p>
                <ol className="list-decimal pl-6 space-y-1 text-[#6b7280]">
                  <li>Check if you have cookies enabled in your browser</li>
                  <li>Ensure you're not blocking JavaScript</li>
                  <li>Try using an incognito/private browsing window</li>
                  <li>Log out completely and log back in</li>
                  <li>Make sure you're using a recent version of your browser</li>
                </ol>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">File Upload Problems</h3>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">File Upload Fails</h4>
                <p className="text-[#6b7280] mb-2">
                  If your file fails to upload, check the following:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[#6b7280]">
                  <li>File size is below 10MB (free tier) or 50MB (premium)</li>
                  <li>File format is .xlsx, .xls, or .csv</li>
                  <li>File is not password protected</li>
                  <li>Your internet connection is stable</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Data Not Loading Correctly</h4>
                <p className="text-[#6b7280] mb-2">
                  If your data doesn't appear as expected:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[#6b7280]">
                  <li>Check that your Excel file has proper column headers</li>
                  <li>Verify there are no merged cells in your data range</li>
                  <li>Remove any formulas that may not be calculating</li>
                  <li>Try saving your file in a different format (e.g., CSV)</li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-[#1f2937] mt-6 mb-3">Analysis and Visualization Issues</h3>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Analysis Takes Too Long</h4>
                <p className="text-[#6b7280] mb-2">
                  If analysis is running slowly:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[#6b7280]">
                  <li>Reduce the size of your dataset by filtering rows</li>
                  <li>Select fewer columns for analysis</li>
                  <li>Choose less computationally intensive analysis types</li>
                  <li>Upgrade to a premium tier for faster processing</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white border border-[#e5e7eb] rounded-lg">
                <h4 className="font-medium text-[#1f2937] mb-2">Visualizations Not Rendering</h4>
                <p className="text-[#6b7280] mb-2">
                  If charts and graphs aren't displaying properly:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-[#6b7280]">
                  <li>Update your browser to the latest version</li>
                  <li>Enable JavaScript and WebGL in your browser settings</li>
                  <li>Disable browser extensions that might interfere</li>
                  <li>Try a different browser (Chrome or Firefox recommended)</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-[#f3f4f6] border border-[#e5e7eb] rounded-lg">
              <h4 className="font-medium text-[#1f2937] mb-2">Still Need Help?</h4>
              <p className="text-[#6b7280]">
                If you're still experiencing issues, contact our support team:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-[#6b7280] mt-2">
                <li>Email: support@excelanalytics.com</li>
                <li>Live Chat: Available Monday-Friday, 9AM-5PM EST</li>
                <li>Help Center: <a href="/help" className="text-[#3f4a8a] hover:underline">Browse Knowledge Base</a></li>
              </ul>
            </div>
          </div>
        );
      
      case 'faqs':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#1f2937] mb-4">Frequently Asked Questions</h2>
            <p className="mb-6 text-[#1f2937]">
              Find answers to common questions about using the Excel Analytics Platform.
            </p>
            
            <div className="space-y-6">
              <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4 bg-[#f9fafb] text-left font-medium text-[#1f2937]"
                  onClick={() => {}}
                >
                  <span>What file types can I upload?</span>
                  <span className="text-[#6b7280]">+</span>
                </button>
                <div className="p-4 bg-white border-t border-[#e5e7eb]">
                  <p className="text-[#6b7280]">
                    The platform supports Excel files (.xlsx, .xls), CSV files (.csv), and TSV files (.tsv). For best results, ensure your Excel files have clean headers in the first row and no merged cells.
                  </p>
                </div>
              </div>
              
              <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4 bg-[#f9fafb] text-left font-medium text-[#1f2937]"
                  onClick={() => {}}
                >
                  <span>How secure is my data?</span>
                  <span className="text-[#6b7280]">+</span>
                </button>
                <div className="p-4 bg-white border-t border-[#e5e7eb]">
                  <p className="text-[#6b7280]">
                    Your data security is our top priority. All files are encrypted both in transit and at rest using industry-standard AES-256 encryption. We never share your data with third parties, and you can delete your data at any time. Our platform is SOC 2 compliant and undergoes regular security audits.
                  </p>
                </div>
              </div>
              
              <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4 bg-[#f9fafb] text-left font-medium text-[#1f2937]"
                  onClick={() => {}}
                >
                  <span>What's the difference between the free and paid plans?</span>
                  <span className="text-[#6b7280]">+</span>
                </button>
                <div className="p-4 bg-white border-t border-[#e5e7eb]">
                  <p className="text-[#6b7280]">
                    The free plan allows you to upload files up to 5MB in size and store up to 10 files with basic analysis features. Paid plans (Pro and Enterprise) offer larger file size limits, unlimited storage, advanced analytics like regression and clustering, API access, priority support, and additional export options. See our Pricing page for a detailed comparison.
                  </p>
                </div>
              </div>
              
              <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4 bg-[#f9fafb] text-left font-medium text-[#1f2937]"
                  onClick={() => {}}
                >
                  <span>Can I collaborate with my team?</span>
                  <span className="text-[#6b7280]">+</span>
                </button>
                <div className="p-4 bg-white border-t border-[#e5e7eb]">
                  <p className="text-[#6b7280]">
                    Yes! Pro and Enterprise plans support team collaboration. You can share files, analyses, and visualizations with team members, set custom permissions, and collaborate in real-time. Enterprise plans include advanced team management features, SSO integration, and custom role definitions.
                  </p>
                </div>
              </div>
              
              <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4 bg-[#f9fafb] text-left font-medium text-[#1f2937]"
                  onClick={() => {}}
                >
                  <span>How do I get help if I encounter a problem?</span>
                  <span className="text-[#6b7280]">+</span>
                </button>
                <div className="p-4 bg-white border-t border-[#e5e7eb]">
                  <p className="text-[#6b7280]">
                    We offer multiple support channels. All users can access our knowledge base and community forums. Pro users get email support with a 24-hour response guarantee. Enterprise users get priority support with a dedicated account manager and phone support. You can also reach out to us via the Help button in the app or by emailing support@excelanalytics.com.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-[#edf7ed] border border-[#39b54b] rounded-lg">
              <h4 className="font-medium text-[#246626] mb-2">Can't find what you're looking for?</h4>
              <p className="text-[#246626]">
                Contact our support team at <a href="mailto:support@excelanalytics.com" className="underline hover:text-[#39b54b]">support@excelanalytics.com</a> or check out our <Link to="/documentation/tutorials" className="underline hover:text-[#39b54b]">video tutorials</Link>.
              </p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-8 text-center">
            <h3 className="text-xl font-medium text-[#1f2937]">Select a topic from the sidebar</h3>
            <p className="text-[#6b7280] mt-2">Choose a documentation topic to learn more about the Excel Analytics Platform.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1f2937] mb-8">Documentation</h1>
        
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-6">
            <div className="bg-white shadow-sm rounded-lg border border-[#e5e7eb] overflow-hidden sticky top-4">
              <h2 className="bg-[#3f4a8a] text-white p-4 font-medium">Documentation Topics</h2>
              <nav className="p-2">
                <ul className="space-y-1">
                  {topics.map(topic => (
                    <li key={topic.id}>
                      <button
                        onClick={() => setActiveSection(topic.id)}
                        className={`w-full text-left px-3 py-2 rounded-md flex items-center space-x-2 transition-colors ${
                          activeSection === topic.id
                            ? 'bg-[#edf7ed] text-[#39b54b]'
                            : 'text-[#1f2937] hover:bg-[#f9fafb]'
                        }`}
                      >
                        <span>{topic.icon}</span>
                        <span>{topic.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="p-4 bg-[#f9fafb] border-t border-[#e5e7eb]">
                <h3 className="font-medium text-[#1f2937] mb-2">Need more help?</h3>
                <p className="text-[#6b7280] text-sm mb-3">
                  Our support team is here to help you with any questions you may have.
                </p>
                <a
                  href="#contact"
                  className="block w-full py-2 px-4 bg-[#39b54b] text-white text-center rounded-md hover:bg-[#2a9939] transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white shadow-sm rounded-lg border border-[#e5e7eb] p-6">
              {renderContent()}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-[#1f2937] mb-4">Didn't find what you were looking for?</h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto mb-6">
            Our comprehensive video tutorials, webinars, and training materials can help you master the Excel Analytics Platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/tutorials"
              className="py-2 px-6 bg-[#3f4a8a] text-white rounded-md hover:bg-[#2f3b7a] transition-colors"
            >
              Watch Tutorials
            </Link>
            <Link
              to="/contact"
              className="py-2 px-6 border border-[#3f4a8a] text-[#3f4a8a] rounded-md hover:bg-[#f0f4ff] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
