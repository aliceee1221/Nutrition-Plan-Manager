const express = require('express');
const { submitNutritionRequest } = require('../controllers/nutritionRequestController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, submitNutritionRequest);

module.exports = router;