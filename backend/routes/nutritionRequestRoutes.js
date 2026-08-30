const express = require('express');
const { submitNutritionRequest, getMyNutritionRequests, updateRequestStatus } = require('../controllers/nutritionRequestController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, submitNutritionRequest);
router.get('/', protect, getMyNutritionRequests);
router.put('/:id/status', protect, updateRequestStatus);

module.exports = router;