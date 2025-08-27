import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user?.token) {
    return <Navigate to="/login" />; // redirige si no hay sesión
  }
  
  return children;
};