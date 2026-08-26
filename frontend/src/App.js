import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />

        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/nutritionist" element={<NutritionistDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
