const mongoose = require('mongoose');

const nutritionRequestSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nutritionGoal: { type: String, required: true },
    dietaryPreferences: { type: String, required: true },
    allergyInformation: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending'}
},{
    timestamps: true // auto createdAt, updatedAt, useful for request tracking
});

module.exports = mongoose.model('NutritionRequest', nutritionRequestSchema);