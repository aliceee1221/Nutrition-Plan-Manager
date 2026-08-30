import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import SubmittedRequestList from '../components/SubmittedRequestList';
import NutritionRequestForm from '../components/NutritionRequestForm';

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  
  const fetchRequests = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/requests', {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      setRequests(response.data);
    } catch (error) {
      console.error('Failed to retrieve nutrition requests.', error);
    }
  }, [user]);
  
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>
      <p className="mb-6">Welcome to the Nutrition Plan Manager.</p>

      <button
        onClick={() => navigate('/nutrition-plan')}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        View Nutrition Plan
      </button>
      
      <NutritionRequestForm onRequestSubmitted={fetchRequests} />
      
      <div className="mt-8">
        {requests.length > 0 ? (
          <SubmittedRequestList requests={requests} />
        ) : (
          <p>No nutrition requests submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;