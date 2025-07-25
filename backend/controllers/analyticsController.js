const Analytics = require('../models/Analytics');
const ExcelFile = require('../models/ExcelFile');
const XLSX = require('xlsx');

// Create new analysis
exports.createAnalysis = async (req, res) => {
  try {
    const { fileId, analysisType, config, name, description } = req.body;

    // Verify file belongs to user
    const file = await ExcelFile.findOne({ 
      _id: fileId, 
      uploadedBy: req.user._id 
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Perform analysis based on type
    let results = {};
    const workbook = XLSX.readFile(file.filePath);
    const worksheet = workbook.Sheets[config.sheetName || workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    switch (analysisType) {
      case 'summary':
        results = generateSummary(data, config.columns);
        break;
      case 'chart':
        results = generateChartData(data, config);
        break;
      case 'filter':
        results = applyFilters(data, config.filters);
        break;
      default:
        results = { data: data.slice(0, 100) }; // Limit to first 100 rows
    }

    const analysis = await Analytics.create({
      fileId,
      userId: req.user._id,
      analysisType,
      config,
      results,
      name,
      description
    });

    res.status(201).json({
      message: 'Analysis created successfully',
      analysis
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create analysis', error: error.message });
  }
};

// Get user's analyses
exports.getUserAnalyses = async (req, res) => {
  try {
    const analyses = await Analytics.find({ userId: req.user._id })
      .populate('fileId', 'originalName filename')
      .sort({ createdAt: -1 });

    res.json({ analyses });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analyses', error: error.message });
  }
};

// Get specific analysis
exports.getAnalysis = async (req, res) => {
  try {
    const { analysisId } = req.params;

    const analysis = await Analytics.findOne({
      _id: analysisId,
      userId: req.user._id
    }).populate('fileId', 'originalName filename');

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analysis', error: error.message });
  }
};

// Helper functions
function generateSummary(data, columns) {
  const summary = {};
  
  columns.forEach(col => {
    const values = data.map(row => row[col]).filter(val => val !== undefined && val !== null);
    const numericValues = values.filter(val => !isNaN(val)).map(val => parseFloat(val));
    
    summary[col] = {
      count: values.length,
      uniqueCount: new Set(values).size,
      ...(numericValues.length > 0 && {
        min: Math.min(...numericValues),
        max: Math.max(...numericValues),
        avg: numericValues.reduce((a, b) => a + b, 0) / numericValues.length,
        sum: numericValues.reduce((a, b) => a + b, 0)
      })
    };
  });
  
  return { summary };
}

function generateChartData(data, config) {
  const { chartType, xColumn, yColumn } = config;
  
  const chartData = data.map(row => ({
    x: row[xColumn],
    y: parseFloat(row[yColumn]) || 0
  }));
  
  return { chartData, chartType };
}

function applyFilters(data, filters) {
  let filteredData = data;
  
  Object.keys(filters).forEach(column => {
    const filter = filters[column];
    filteredData = filteredData.filter(row => {
      const value = row[column];
      
      if (filter.type === 'equals') {
        return value === filter.value;
      } else if (filter.type === 'contains') {
        return value && value.toString().toLowerCase().includes(filter.value.toLowerCase());
      } else if (filter.type === 'range') {
        const numValue = parseFloat(value);
        return numValue >= filter.min && numValue <= filter.max;
      }
      
      return true;
    });
  });
  
  return { data: filteredData };
}
