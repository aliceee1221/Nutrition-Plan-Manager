const express = require('express');
const { submitNutritionRequest, getMyNutritionRequests, getAllNutritionRequests, updateRequestStatus } = require('../controllers/nutritionRequestController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, submitNutritionRequest);
router.get('/all', protect, getAllNutritionRequests);
router.get('/', protect, getMyNutritionRequests);
router.put('/:id/status', protect, updateRequestStatus);

module.exports = router;