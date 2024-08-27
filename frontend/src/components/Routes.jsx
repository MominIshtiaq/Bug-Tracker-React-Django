import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import AuthRedirect from "../components/AuthRedirect";
import Index from "../components/registration/Index";
import SignUp from "../components/registration/SignUp";
import Login from "../components/registration/Login";
import Dashboard from "../components/Project Dashboard/Dashboard";
import Bug from "../components/Bug Dashboard/Bug";

const Routess = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup/:user" element={<SignUp />} />
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthRedirect>
                <Dashboard />
              </AuthRedirect>
            }
          />
          <Route path="/bug/:project_id" element={<Bug />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default Routess;
