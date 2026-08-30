import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const NutritionistRequestDetail = ({ request, onStatusUpdated }) => {
  const { user } = useAuth(); 
  if (!request) {
    return null;
  }

  const handleMarkInReview = async () => {
    try {
      const response = await axiosInstance.put(
        `/api/requests/${request._id}/status`,
        { status: 'In Review'},
        { headers: { Authorization: `Bearer ${user.token}` }}
      );

      if (onStatusUpdated) {
        onStatusUpdated(response.data);
      }
    } catch (error) {
      console.error('Failed to update request status.', error);
    }
  };
  
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

      <button
        onClick={handleMarkInReview}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Mark In Review
      </button>
    </div>
  );
};

export default NutritionistRequestDetail;