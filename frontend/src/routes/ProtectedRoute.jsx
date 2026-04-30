import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // ✅ WAIT for auth restore
  if (loading) return null;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;