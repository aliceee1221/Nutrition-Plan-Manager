const express = require('express');
const { createNutritionPlan, getNutritionPlans, updateNutritionPlan } = require('../controllers/nutritionPlanController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createNutritionPlan);
router.get('/', protect, getNutritionPlans);
router.put('/:id', protect, updateNutritionPlan);

module.exports = router;