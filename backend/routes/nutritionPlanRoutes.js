const express = require('express');
const { createNutritionPlan, getNutritionPlans, updateNutritionPlan, publishNutritionPlan, getMyPublishedNutritionPlans } = require('../controllers/nutritionPlanController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createNutritionPlan);
router.get('/my-published', protect, getMyPublishedNutritionPlans);
router.get('/', protect, getNutritionPlans);
router.put('/:id/publish', protect, publishNutritionPlan);
router.put('/:id', protect, updateNutritionPlan);

module.exports = router;