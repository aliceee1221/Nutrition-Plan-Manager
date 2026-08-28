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

module.exports = { submitNutritionRequest };