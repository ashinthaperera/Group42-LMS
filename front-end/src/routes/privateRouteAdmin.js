import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSlice";

export const AdminPrivateRoutes = () => {
    const user = useSelector(selectUser);

  if (user.role === 'admin') {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
  
};