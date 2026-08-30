const NutritionRequest = require('../models/NutritionRequest');

const submitNutritionRequest = async (req, res) => {
    try{
        if (req.user.role !== 'client') {
            return res.status(403).json({ message: 'Only clients can submit nutrition requests.' });
        }

        const { nutritionGoal, dietaryPreferences, allergyInformation } = req.body;

        if (!nutritionGoal || !nutritionGoal.trim() ||
            !dietaryPreferences || !dietaryPreferences.trim() ||
            !allergyInformation || !allergyInformation.trim()) {
            return res.status(400).json({ message: 'All nutrition request fields are required.' });
        }
        
        const nutritionRequest = await NutritionRequest.create({
            client: req.user._id, 
            nutritionGoal,
            dietaryPreferences,
            allergyInformation
        });

        res.status(201).json(nutritionRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit nutrition request.' });
    }
};

const getMyNutritionRequests = async (req, res) => {
    try{
        const requests = await NutritionRequest.find({
            client: req.user._id
        })

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve nutrition requests.' })
    }
};

const updateRequestStatus = async (req, res) => {
  try {
    if (req.user.role !== 'nutritionist') {
      return res.status(403).json({ message: 'Only nutritionists can update request status.' });
    }

    const { status } = req.body;

    const validStatuses = ['Pending', 'In Review', 'Plan Available'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid request status.' });
    }

    const nutritionRequest = await NutritionRequest.findById(req.params.id);

    if (!nutritionRequest) {
      return res.status(404).json({ message: 'Nutrition request not found.' });
    }

    nutritionRequest.status = status;

    const updatedRequest = await nutritionRequest.save();
    
    await updatedRequest.populate('client', 'name email');

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update request status.'});
  }
};

const getAllNutritionRequests = async (req, res) => {
  try {
    if (req.user.role !== 'nutritionist') {
      return res.status(403).json({ message: 'Only nutritionists can view all client requests.' });
    }

    const requests = await NutritionRequest.find().populate('client', 'name email'); // Display Client identification information

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve client nutrition requests.' });
  }
};

module.exports = { submitNutritionRequest, getMyNutritionRequests, getAllNutritionRequests, updateRequestStatus };