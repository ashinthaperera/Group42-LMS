import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSlice";

export const LoggedPrivateRoutes = () => {
    const user = useSelector(selectUser);

  if (user.role) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
  
};

// export const LecturerPrivateRoutes = ()=>{
//     const user = useSelector(selectUser);

//     if (user.role === 'lecturer') {
//       return <Outlet />;
//     } else {
//       return <Navigate to="/" replace />;
//     }
// }

// export const StudentPrivateRoutes = ()=>{
//     const user = useSelector(selectUser);

//     if (user.role === 'student') {
//       return <Outlet />;
//     } else {
//       return <Navigate to="/" replace />;
//     }
// }

