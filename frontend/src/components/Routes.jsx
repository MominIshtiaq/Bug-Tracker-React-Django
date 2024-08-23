import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Index from "./Index"
import SignUp from './SignUp'
import Login from './Login'
import Dashboard from './Dashboard';
import Bug from './Bug';

const Routess = () => {
  const { loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Index />} exact />
            <Route path="/signup/:user" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute/>}>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/bug/:project_id" element={<Bug />}/>
            </Route>
          </Routes>
        </Router>
      )}
    </>
  );
};

export default Routess;