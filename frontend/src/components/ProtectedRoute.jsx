import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!loading) {
      setShouldRedirect(!isAuthenticated);
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return shouldRedirect ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoute;
