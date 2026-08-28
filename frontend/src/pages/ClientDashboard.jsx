import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import SubmittedRequestList from '../components/SubmittedRequestList';
import NutritionRequestForm from '../components/NutritionRequestForm';

const ClientDashboard = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();
  
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