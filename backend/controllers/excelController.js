const ExcelFile = require('../models/ExcelFile');
const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/excel/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.xlsx', '.xls', '.csv'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Only Excel files (.xlsx, .xls) and CSV files are allowed'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Upload Excel file
exports.uploadFile = async (req, res) => {
  try {
    upload.single('excelFile')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Read Excel file to get metadata
      const workbook = XLSX.readFile(req.file.path);
      const sheetNames = workbook.SheetNames;
      
      // Get first sheet for row/column count
      const firstSheet = workbook.Sheets[sheetNames[0]];
      const range = XLSX.utils.decode_range(firstSheet['!ref'] || 'A1');
      
      const excelFile = await ExcelFile.create({
        filename: req.file.filename,
        originalName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
        sheetNames: sheetNames,
        uploadedBy: req.user._id,
        metadata: {
          totalRows: range.e.r + 1,
          totalColumns: range.e.c + 1,
          fileType: path.extname(req.file.originalname)
        },
        status: 'processed'
      });

      res.status(201).json({
        message: 'File uploaded successfully',
        file: excelFile
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
};

// Get user's files
exports.getUserFiles = async (req, res) => {
  try {
    const files = await ExcelFile.find({ uploadedBy: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json({ files });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch files', error: error.message });
  }
};

// Get file data
exports.getFileData = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { sheetName } = req.query;

    const file = await ExcelFile.findOne({ 
      _id: fileId, 
      uploadedBy: req.user._id 
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const workbook = XLSX.readFile(file.filePath);
    const targetSheet = sheetName || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[targetSheet];
    const data = XLSX.utils.sheet_to_json(worksheet);

    res.json({
      sheetName: targetSheet,
      data: data,
      availableSheets: workbook.SheetNames
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to read file data', error: error.message });
  }
};

// Delete file
exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await ExcelFile.findOne({ 
      _id: fileId, 
      uploadedBy: req.user._id 
    });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Delete physical file
    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);
    }

    // Delete from database
    await ExcelFile.findByIdAndDelete(fileId);

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete file', error: error.message });
  }
};
