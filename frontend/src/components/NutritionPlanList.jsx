const NutritionPlanList = ({ plans, onEditPlan }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">
        Existing Nutrition Plans
      </h2>

      {plans.map((plan) => (
        <div
          key={plan._id}
          className="bg-gray-100 p-4 mb-4 rounded shadow"
        >
          <p>
            <strong>Client:</strong>{' '}
            {plan.client?.name}
          </p>

          <p>
            <strong>Nutrition Goal:</strong>{' '}
            {plan.request?.nutritionGoal}
          </p>

          <p>
            <strong>Plan Content:</strong>{' '}
            {plan.planContent}
          </p>

          <p>
            <strong>Notes:</strong>{' '}
            {plan.notes || 'None'}
          </p>

          <button
            onClick={() => onEditPlan(plan)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Plan
          </button>
        </div>
      ))}
    </div>
  );
};

export default NutritionPlanList;