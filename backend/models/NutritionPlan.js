const mongoose = require('mongoose');

const nutritionPlanSchema = new mongoose.Schema({
    request: { type: mongoose.Schema.Types.ObjectId, ref: 'NutritionRequest', required: true},
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nutritionist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planContent: { type: String, required: true },
    notes: { type: String }
},{
    timestamps: true
});

module.exports = mongoose.model('NutritionPlan', nutritionPlanSchema);