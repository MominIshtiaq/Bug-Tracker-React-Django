import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiService from "../../../services/index";

const SignUp = () => {
  const { user } = useParams();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    user_type: user,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiService.signup(formData);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
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
            <h4>Sign Up</h4>
            <p>Please fill your information below</p>
            <div className="manage">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="ControlInput1">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder="Enter your Name"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ControlInput2">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter your email"
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
                  Sign Up &nbsp;&nbsp;&nbsp;
                  <i className="fa-solid fa-angle-right"></i>
                </Button>
              </Form>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <p>Already have an account?</p>
              <Link to="/login" className="text-decoration-none">
                Login to your account
              </Link>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SignUp;
