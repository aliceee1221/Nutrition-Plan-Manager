import { useState } from 'react'; // Save the content currently entered by the user
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const NutritionRequestForm = () => { // Create form data
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        nutritionGoal: '', dietaryPreferences: '', allergyInformation: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => { // Prevent the browser from refreshing the page when submitting
        e.preventDefault();

        if (!formData.nutritionGoal.trim()) { 
            setError('Nutrition goal is required.');
            return;
        }
        if (!formData.dietaryPreferences.trim()) {
            setError('Dietary preferences are required.');
            return;
        }
        if (!formData.allergyInformation.trim()) {
            setError('Allergy information is required.');
            return;
        }

        setError('');
        
        try {
            const response = await axiosInstance.post(
                '/api/requests', formData,
                {headers: {Authorization: `Bearer ${user.token}`}}
            );
            console.log(response.data);
        } catch (error) {
          console.error('Failed to submit nutrition request.', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="bg-white p-6 shadow-md rounded">
            <h1 className="text-2xl font-bold mb-4">Submit Nutrition Request</h1>
            <label className="block mb-2 font-medium">Nutrition Goal</label>
            <input
              type="text"
              placeholder="e.g. Weight loss"
              value={formData.nutritionGoal}
              onChange={(e) => setFormData({ ...formData, nutritionGoal: e.target.value })}
              required
              className="w-full mb-4 p-2 border rounded"
            />
            <label className="block mb-2 font-medium">Dietary Preferences</label>
            <input
              type="text"
              placeholder="e.g. Vegetarian"
              value={formData.dietaryPreferences}
              onChange={(e) => setFormData({ ...formData, dietaryPreferences: e.target.value })}
              required
              className="w-full mb-4 p-2 border rounded"
            />
            <label className="block mb-2 font-medium">Allergy Information</label>
            <input
              type="text"
              placeholder="e.g. Peanuts or No known allergies"
              value={formData.allergyInformation}
              onChange={(e) => setFormData({ ...formData, allergyInformation: e.target.value })}
              required
              className="w-full mb-4 p-2 border rounded"
            />
            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                Submit Request
            </button>
        </form>
    );
};

export default NutritionRequestForm;