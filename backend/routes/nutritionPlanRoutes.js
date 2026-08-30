const express = require('express');
const { createNutritionPlan } = require('../controllers/nutritionPlanController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createNutritionPlan);

module.exports = router;