import { useState, useContext, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const tokenExpiry = localStorage.getItem('expirationTime')

  useEffect(()=> {
    if (!token && !tokenExpiry) {
      //
    }
    else if(token && tokenExpiry && Date.now() > tokenExpiry) {
      localStorage.removeItem('token')
      localStorage.removeItem('expirationTime')
    } else {
      navigate('/dashboard')
    }
  })

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { setLoading } = useContext(AuthContext);
  const { setIsAuthenticated } = useContext(AuthContext);

  const [error, setError] = useState('');
  

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
      const token = response.data.token;
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', expirationTime);
      setIsAuthenticated(true);
      setLoading(false)
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.log(error)
    }
  };

  return (
    <Row className="vh-100">
      <Col md={5}>
        <Image src="/public/images/index.jpeg" alt="Computer image" fluid />
      </Col>
      <Col md={7} className="p-5">
        <Row className="h-100">
          <Col>
            <h4>Login</h4>
            <p>Please enter your login details</p>
            <div className="manage">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                      name="email" 
                      type="email" 
                      placeholder="Enter your Email" 
                      value={formData.email}
                      onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ControlInput3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      name="password" 
                      type="password" 
                      placeholder="Enter your password" 
                      value={formData.password}
                      onChange={handleChange}
                    />
                </Form.Group>
    
                <Button type="submit" variant="primary">
                  Login &nbsp;&nbsp;&nbsp;
                  <i className="fa-solid fa-angle-right"></i>
                </Button>
              </Form>
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <p>Do not have an account?</p>
              <Link to="/" className="text-decoration-none">
                Create account
              </Link>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
