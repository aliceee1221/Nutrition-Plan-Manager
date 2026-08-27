import { Navigate } from 'react-router-dom'; // 用户不应该留在当前页面，Navigate到另一个 URL
import { useAuth } from '../context/AuthContext'; // 获取user

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
    export default ProtectedRoute;