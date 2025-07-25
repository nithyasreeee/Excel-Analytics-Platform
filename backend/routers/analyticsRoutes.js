const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createAnalysis,
  getUserAnalyses,
  getAnalysis
} = require('../controllers/analyticsController');

// All routes are protected
router.use(protect);

router.post('/create', createAnalysis);
router.get('/', getUserAnalyses);
router.get('/:analysisId', getAnalysis);

module.exports = router;
