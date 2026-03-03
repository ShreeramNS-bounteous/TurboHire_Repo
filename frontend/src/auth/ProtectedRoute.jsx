import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, roles }) {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) return null;

  const token = localStorage.getItem("accessToken");

  // 🚨 If no token → block
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  try {
    const decoded = jwtDecode(token);

    // 🚨 Check expiration
    if (decoded.exp * 1000 < Date.now()) {
      logout();
      return <Navigate to="/login" replace />;
    }

    // 🚨 Role mismatch
    if (roles && !roles.includes(decoded.role)) {
      return <Navigate to="/login" replace />;
    }

  } catch (err) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return children;
}