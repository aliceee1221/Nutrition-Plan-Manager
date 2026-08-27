const submitNutritionRequest = async (req, res) => {
    const { nutritionGoal, dietaryPreferences, allergyInformation } = req.body;
    res.status(200).json({
        message: 'Nutrition request received successfully.',
        nutritionGoal,
        dietaryPreferences,
        allergyInformation
    });
}

module.exports = { submitNutritionRequest };