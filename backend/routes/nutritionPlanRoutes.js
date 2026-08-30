const express = require('express');
const { createNutritionPlan, getNutritionPlans } = require('../controllers/nutritionPlanController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createNutritionPlan);
router.get('/', protect, getNutritionPlans);

module.exports = router;