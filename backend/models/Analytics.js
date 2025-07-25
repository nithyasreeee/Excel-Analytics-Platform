const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExcelFile',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  analysisType: {
    type: String,
    enum: ['summary', 'chart', 'pivot', 'filter', 'formula'],
    required: true
  },
  config: {
    sheetName: String,
    columns: [String],
    chartType: String,
    filters: mongoose.Schema.Types.Mixed,
    formulas: [String]
  },
  results: {
    data: mongoose.Schema.Types.Mixed,
    chartData: mongoose.Schema.Types.Mixed,
    summary: mongoose.Schema.Types.Mixed
  },
  name: {
    type: String,
    required: true
  },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
