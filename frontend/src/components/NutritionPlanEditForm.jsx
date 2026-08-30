import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const NutritionPlanEditForm = ({ plan, onPlanUpdated }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ 
    planContent: plan.planContent || '', 
    notes: plan.notes || '' 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setFormData({
      planContent: plan.planContent || '',
      notes: plan.notes || ''
    });

    setError('');
  }, [plan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');

    if (!formData.planContent.trim()) {
      setError('Plan content is required.');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.put(
        `/api/plans/${plan._id}`,
        {
          planContent: formData.planContent,
          notes: formData.notes
        },
        {headers: { Authorization: `Bearer ${user.token}` }}
      );
      
      setSuccess('Nutrition plan updated successfully.');

      if (onPlanUpdated) { 
        onPlanUpdated(response.data);
      }

    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update nutrition plan.');
    }    
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white p-6 shadow-md rounded mt-6"
    >
      <h2 className="text-xl font-bold mb-4">
        Edit Nutrition Plan
      </h2>

      <label className="block mb-2 font-medium">
        Plan Content
      </label>

      <textarea
        value={formData.planContent}
        onChange={(e) =>
          setFormData({
            ...formData,
            planContent: e.target.value
          })
        }
        required
        className="w-full mb-4 p-2 border rounded"
        rows="6"
      />

      <label className="block mb-2 font-medium">
        Notes
      </label>

      <textarea
        value={formData.notes}
        onChange={(e) =>
          setFormData({
            ...formData,
            notes: e.target.value
          })
        }
        className="w-full mb-4 p-2 border rounded"
        rows="3"
      />

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {success && (
        <p className="text-green-600 mb-4">{success}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Save Changes
      </button>
    </form>
  );
};

export default NutritionPlanEditForm;