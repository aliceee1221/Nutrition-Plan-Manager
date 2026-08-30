import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import NutritionistRequestList from '../components/NutritionistRequestList';
import NutritionistRequestDetail from '../components/NutritionistRequestDetail';
import NutritionPlanForm from '../components/NutritionPlanForm';
import NutritionPlanList from '../components/NutritionPlanList';
import NutritionPlanEditForm from '../components/NutritionPlanEditForm';

const NutritionistDashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planToPublish, setPlanToPublish] = useState(null);
  const [publishError, setPublishError] = useState('');

  const handlePlanUpdated = (updatedPlan) => {
    setPlans(
      plans.map((plan) =>
        plan._id === updatedPlan._id
          ? updatedPlan
          : plan
      )
    );

    setSelectedPlan(updatedPlan);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get('/api/requests/all', { 
          headers: { Authorization: `Bearer ${user.token}` }
        });

        setRequests(response.data);
      } catch (error) {
        console.error('Failed to retrieve client requests.', error);
      }
    };

    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get('/api/plans',{
          headers: { Authorization: `Bearer ${user.token}`}
        });

        setPlans(response.data);
      } catch (error) {
        console.error('Failed to retrieve nutrition plans.', error);
      }
    };

    fetchRequests();
    fetchPlans();
  }, [user]);

  const handleStatusUpdated = (updatedRequest) => {
    setRequests(requests.map((request) =>
      request._id === updatedRequest._id 
        ? updatedRequest 
        : request
      )
    );

    setSelectedRequest(updatedRequest);
  };

  const handlePublishPlan = (plan) => {
    setPublishError('');

    if (!plan.planContent || !plan.planContent.trim()) {
      setPublishError('Plan content is required before publication.');
      return;
    }

    setPlanToPublish(plan);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Nutritionist Dashboard</h1>
      <p className="mb-6">Welcome to the Nutrition Plan Manager.</p>
      
      <NutritionistRequestList
        requests={requests}
        onSelectRequest={setSelectedRequest}
      />

      <NutritionistRequestDetail 
        request={selectedRequest}
        onStatusUpdated={handleStatusUpdated}
      />

      {selectedRequest && (
        <NutritionPlanForm request={selectedRequest} />
      )}
      
      <NutritionPlanList 
        plans={plans} 
        onEditPlan={setSelectedPlan}
        onPublishPlan={handlePublishPlan}
      />

      {publishError && (
        <p className="text-red-500 mt-4">
          {publishError}
        </p>
      )}

      {planToPublish && (
        <div className="bg-white p-6 shadow-md rounded mt-6">
          <h2 className="text-xl font-bold mb-4">Publish Nutrition Plan</h2>

          <p>
            <strong>Client:</strong>{' '}
            {planToPublish.client?.name}
          </p>

          <p>
            <strong>Plan Content:</strong>{' '}
            {planToPublish.planContent}
          </p>

          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Confirm Publish
          </button>
        </div>
      )}

      {selectedPlan && (
        <NutritionPlanEditForm 
          plan={selectedPlan}
          onPlanUpdated={handlePlanUpdated}
        />
      )}
    </div>
  );
};

export default NutritionistDashboard;