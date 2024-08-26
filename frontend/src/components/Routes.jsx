import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import AuthRedirect from "../components/AuthRedirect";
import Index from "./Index";
import SignUp from "./SignUp";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Bug from "./Bug";

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
          <Route
            path="/bug/:project_id"
            element={
              <AuthRedirect>
                <Bug />
              </AuthRedirect>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default Routess;
