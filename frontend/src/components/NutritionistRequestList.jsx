const NutritionistRequestList = ({ requests, onSelectRequest }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Client Nutrition Requests
      </h2>

      {requests.map((request) => (
        <div
          key={request._id}
          className="bg-gray-100 p-4 mb-4 rounded shadow"
        >
          <p>
            <strong>Client:</strong>{' '}
            {request.client?.name}
          </p>

          <p>
            <strong>Nutrition Goal:</strong>{' '}
            {request.nutritionGoal}
          </p>

          <p>
            <strong>Status:</strong>{' '}
            {request.status}
          </p>

          <button
            onClick={() => onSelectRequest(request)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            View Request
          </button>
        </div>
      ))}
    </div>
  );
};

export default NutritionistRequestList;