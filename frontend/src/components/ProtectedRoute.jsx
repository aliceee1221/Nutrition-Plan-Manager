import { Navigate } from 'react-router-dom'; // 用户不应该留在当前页面，Navigate到另一个 URL
import { useAuth } from '../context/AuthContext'; // 获取user

const ProtectedRoute = ({ children, allowedRole }) => { // ProtectedRoute 不仅知道被保护的页面是谁，还可以知道这个页面允许哪个 role。
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
    export default ProtectedRoute;