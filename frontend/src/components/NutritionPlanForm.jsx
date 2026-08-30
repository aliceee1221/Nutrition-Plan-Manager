import { useState } from 'react';

const NutritionPlanForm = ({ request }) => {
  const [formData, setFormData] = useState({ planContent: '', notes: '' }); // Allow the Nutritionist to enter plan content and add notes

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow-md rounded mt-6"
    >
      <h2 className="text-xl font-bold mb-4">
        Create Nutrition Plan
      </h2>

      <div className="mb-4">
        <p>
          <strong>Client:</strong>{' '}
          {request.client?.name}
        </p>

        <p>
          <strong>Nutrition Goal:</strong>{' '}
          {request.nutritionGoal}
        </p>
      </div>

      <label className="block mb-2 font-medium">
        Plan Content
      </label>

      <textarea
        placeholder="Enter nutrition plan content"
        value={formData.planContent}
        onChange={(e) =>
          setFormData({
            ...formData,
            planContent: e.target.value
          })
        }
        className="w-full mb-4 p-2 border rounded"
        rows="6"
      />

      <label className="block mb-2 font-medium">
        Notes
      </label>

      <textarea
        placeholder="Add additional notes"
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

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Create Plan
      </button>
    </form>
  );
};

export default NutritionPlanForm;