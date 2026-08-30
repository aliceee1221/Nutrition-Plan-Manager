const NutritionPlan = require('../models/NutritionPlan');
const NutritionRequest = require('../models/NutritionRequest');

const createNutritionPlan = async (req, res) => {
  try {
    if (req.user.role !== 'nutritionist') {
      return res.status(403).json({ message: 'Only nutritionists can create nutrition plans.' });
    }

    const { requestId, planContent, notes } = req.body;

    if (!requestId || !planContent || !planContent.trim()) {
      return res.status(400).json({ message: 'Request and plan content are required.' });
    }

    const nutritionRequest = await NutritionRequest.findById(requestId);

    if (!nutritionRequest) {
      return res.status(404).json({ message: 'Nutrition request not found.' });
    }

    const nutritionPlan = await NutritionPlan.create({
      request: nutritionRequest._id,
      client: nutritionRequest.client,
      nutritionist: req.user._id,
      planContent,
      notes
    });

    res.status(201).json(nutritionPlan);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create nutrition plan.' });
  }
};

module.exports = { createNutritionPlan };