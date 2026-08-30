const NutritionistRequestDetail = ({ request }) => {
  if (!request) {
    return null;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded mt-6">
      <h2 className="text-xl font-bold mb-4">
        Request Details
      </h2>

      <p>
        <strong>Client:</strong>{' '}
        {request.client?.name}
      </p>

      <p>
        <strong>Email:</strong>{' '}
        {request.client?.email}
      </p>

      <p>
        <strong>Nutrition Goal:</strong>{' '}
        {request.nutritionGoal}
      </p>

      <p>
        <strong>Dietary Preferences:</strong>{' '}
        {request.dietaryPreferences}
      </p>

      <p>
        <strong>Allergy Information:</strong>{' '}
        {request.allergyInformation}
      </p>

      <p>
        <strong>Status:</strong>{' '}
        {request.status}
      </p>
    </div>
  );
};

export default NutritionistRequestDetail;