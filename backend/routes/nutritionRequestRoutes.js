const express = require('express');
const { submitNutritionRequest, getMyNutritionRequests } = require('../controllers/nutritionRequestController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, submitNutritionRequest)
router.get('/', protect, getMyNutritionRequests);

module.exports = router;