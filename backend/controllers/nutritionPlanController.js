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

const getNutritionPlans = async (req, res) => {
  try {
    if (req.user.role !== 'nutritionist') {
      return res.status(403).json({ message: 'Only nutritionists can view nutrition plans.' });
    }

    const plans = await NutritionPlan.find()
      .populate('client', 'name email')
      .populate('request', 'nutritionGoal');

    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve nutrition plans.' });
  }
};

const updateNutritionPlan = async (req, res) => {
  try {
    if (req.user.role !== 'nutritionist') {
      return res.status(403).json({ message: 'Only nutritionists can update nutrition plans.' });
    }

    const { planContent, notes } = req.body;

    if (!planContent || !planContent.trim()) {
      return res.status(400).json({ message: 'Plan content is required.' });
    }

    const nutritionPlan = await NutritionPlan.findById(req.params.id);

    if (!nutritionPlan) {
      return res.status(404).json({ message: 'Nutrition plan not found.' });
    }

    nutritionPlan.planContent = planContent;
    nutritionPlan.notes = notes;

    const updatedPlan = await nutritionPlan.save();

    await updatedPlan.populate('client', 'name email');
    await updatedPlan.populate('request', 'nutritionGoal');

    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update nutrition plan.' });
  }
};

const publishNutritionPlan = async (req, res) => {
  try {
    if (req.user.role !== 'nutritionist') {
      return res.status(403).json({ message: 'Only nutritionists can publish nutrition plans.' });
    }

    const nutritionPlan = await NutritionPlan.findById(req.params.id);

    if (!nutritionPlan) {
      return res.status(404).json({ message: 'Nutrition plan not found.' });
    }

    if (
      !nutritionPlan.planContent ||
      !nutritionPlan.planContent.trim()
    ) {
      return res.status(400).json({ message: 'Incomplete nutrition plans cannot be published.' });
    }

    const nutritionRequest =
      await NutritionRequest.findById(
        nutritionPlan.request
      );

    if (!nutritionRequest) {
      return res.status(404).json({ message: 'Associated nutrition request not found.' });
    }

    nutritionPlan.published = true;
    await nutritionPlan.save();

    nutritionRequest.status = 'Plan Available';
    await nutritionRequest.save();

    res.status(200).json({
      message: 'Nutrition plan published successfully.',
      plan: nutritionPlan,
      requestStatus: nutritionRequest.status
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to publish nutrition plan.' });
  }
};

const getMyPublishedNutritionPlans = async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can view published nutrition plans.' });
    }

    const plans = await NutritionPlan.find({
      client: req.user._id,
      published: true
    })
      .populate('nutritionist', 'name email')
      .populate('request', 'nutritionGoal');

    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve published nutrition plans.' });
  }
};

module.exports = { createNutritionPlan, getNutritionPlans, updateNutritionPlan, publishNutritionPlan, getMyPublishedNutritionPlans };