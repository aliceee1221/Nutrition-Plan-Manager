const express = require('express');
const { createNutritionPlan, getNutritionPlans, updateNutritionPlan, publishNutritionPlan } = require('../controllers/nutritionPlanController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createNutritionPlan);
router.get('/', protect, getNutritionPlans);
router.put('/:id', protect, updateNutritionPlan);
router.put('/:id/publish', protect, publishNutritionPlan);

module.exports = router;