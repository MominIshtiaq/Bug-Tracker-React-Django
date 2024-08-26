import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Index = () => {
  return (
    <Row className="vh-100">
      <Col md={5}>
        <Image src="/public/images/index.jpeg" alt="Computer image" fluid />
      </Col>
      <Col md={7} className="p-5">
        <Row className="w-100 mb-3">
          <p className="text-secondary-emphasis text-end">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Log in
            </Link>
          </p>
        </Row>
        <Row className="h-100">
          <Col>
            <h4>Join Us!</h4>
            <p>
              To begin this journey, tell us what type of account you would be
              opening
            </p>
            <div className="manage">
              {/* Manager */}
              <Link
                to="/signup/manager"
                className="text-decoration-none text-black"
              >
                <div className="box shadow-sm scaleup p-3 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fa-solid fa-user fa-2x me-3"></i>
                    <div>
                      <p>
                        <strong>Manager</strong>
                        <br />
                        Signup as a manager to manage the tasks and bugs
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Developer */}
              <Link
                to="/signup/developer"
                className="text-decoration-none text-black"
              >
                <div className="box shadow-sm scaleup p-3 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fa-solid fa-suitcase fa-2x me-3"></i>
                    <div>
                      <p>
                        <strong>Developer</strong>
                        <br />
                        Signup as a developer to assign the relevant tasks to QA
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Quality Assurance */}
              <Link to="/signup/qa" className="text-decoration-none text-black">
                <div className="box shadow-sm scaleup p-3 mb-3">
                  <div className="d-flex align-items-center">
                    <i className="fa-solid fa-star fa-2x me-3"></i>
                    <div>
                      <p>
                        <strong>QA</strong>
                        <br />
                        Signup as a QA to create the bugs and report in tasks
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Index;
