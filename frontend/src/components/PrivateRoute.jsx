import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// reroute to login if there is no userInfo
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;
