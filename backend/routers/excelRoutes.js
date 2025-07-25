const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  uploadFile,
  getUserFiles,
  getFileData,
  deleteFile
} = require('../controllers/excelController');

// All routes are protected
router.use(protect);

router.post('/upload', uploadFile);
router.get('/files', getUserFiles);
router.get('/files/:fileId/data', getFileData);
router.delete('/files/:fileId', deleteFile);

module.exports = router;
