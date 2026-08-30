import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import NutritionistRequestList from '../components/NutritionistRequestList';
import NutritionistRequestDetail from '../components/NutritionistRequestDetail';

const NutritionistDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get('/api/requests/all', { 
          headers: { Authorization: `Bearer ${user.token}` }}
        );

        setRequests(response.data);
      } catch (error) {
        console.error('Failed to retrieve client requests.', error);
      }
    };

    fetchRequests();
  }, [user]);

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
      />
    </div>
  );
};

export default NutritionistDashboard;