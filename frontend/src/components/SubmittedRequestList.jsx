const SubmittedRequestList = ({ requests }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Submitted Requests
      </h2>

      {requests.map((request) => (
        <div
          key={request._id}
          className="bg-gray-100 p-4 mb-4 rounded shadow"
        >
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
      ))}
    </div>
  );
};

export default SubmittedRequestList;