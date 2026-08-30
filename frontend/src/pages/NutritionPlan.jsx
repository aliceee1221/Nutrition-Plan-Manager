import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const NutritionPlan = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPublishedPlans = async () => {
      try {
        const response = await axiosInstance.get(
          '/api/plans/my-published',
          {headers: { Authorization: `Bearer ${user.token}` }}
        );

        setPlans(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(
          'Failed to retrieve published nutrition plans.',
          error
        );
      }
    };

    fetchPublishedPlans();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Nutrition Plan</h1>

      <p className="mb-6">View your published nutrition plan below.</p>

      {plans.map((plan) => (
        <div
          key={plan._id}
          className="bg-white p-6 shadow-md rounded mb-4"
        >
          <h2 className="text-xl font-bold mb-4">Nutrition Plan Details</h2>

          <p>
            <strong>Nutrition Goal:</strong>{' '}
            {plan.request?.nutritionGoal}
          </p>

          <p className="mt-4">
            <strong>Plan Content:</strong>{' '}
            {plan.planContent}
          </p>

          <p className="mt-4">
            <strong>Nutritionist Notes:</strong>{' '}
            {plan.notes || 'None'}
          </p>

          <p className="mt-4">
            <strong>Nutritionist:</strong>{' '}
            {plan.nutritionist?.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NutritionPlan;