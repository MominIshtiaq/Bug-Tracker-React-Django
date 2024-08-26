import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthRedirect = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated || token) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthRedirect;
