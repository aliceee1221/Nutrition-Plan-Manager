import NutritionRequestForm from '../components/NutritionRequestForm';

const ClientDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>
      <p className="mb-6">Welcome to the Nutrition Plan Manager.</p>
      <NutritionRequestForm />
    </div>
  );
};

export default ClientDashboard;