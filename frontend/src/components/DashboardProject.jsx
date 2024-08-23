/* eslint-disable react/prop-types */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const DashboardProject = ({projects}) => {
  const navigate = useNavigate()

  if (projects.length === 0) {
    return (
      <Container  className="text-center mt-5">
        <h3>No Project Found</h3>
      </Container>
    );
  }

    return (
        <Container>
          <Row className="mt-4" id="project-list">
            {projects.map((project) => (
              <Col key={project.id} xs={12} md={6} lg={4} className="mb-4 d-flex">
                <Card className="shadow-sm scaleup h-100 w-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="bg-primary img_icon">
                    <i className="fa-solid fa-lightbulb"></i>
                    </div>
                    <Card.Title className="mt-2">{project.name}</Card.Title>
                    <Card.Text className="flex-grow-1">{project.detail}</Card.Text>
                    <Button variant="outline-primary" onClick={()=> navigate(`/bug/${project.id}`)}>View Bugs</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      );
}

export default DashboardProject