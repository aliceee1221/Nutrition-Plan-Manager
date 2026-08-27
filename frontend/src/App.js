import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AccessDenied from './pages/AccessDenied';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import ClientDashboard from './pages/ClientDashboard';
import NutritionistDashboard from './pages/NutritionistDashboard';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/tasks" element={<Tasks />} />

        <Route path="/client" element={<ProtectedRoute allowedRole="client"><ClientDashboard /></ProtectedRoute>} />
        <Route path="/nutritionist" element={<ProtectedRoute allowedRole="nutritionist"><NutritionistDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
