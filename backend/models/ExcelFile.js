const mongoose = require('mongoose');

const excelFileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  sheetNames: [{
    type: String
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['uploaded', 'processing', 'processed', 'error'],
    default: 'uploaded'
  },
  metadata: {
    totalRows: Number,
    totalColumns: Number,
    fileType: String
  }
}, { timestamps: true });

module.exports = mongoose.model('ExcelFile', excelFileSchema);
