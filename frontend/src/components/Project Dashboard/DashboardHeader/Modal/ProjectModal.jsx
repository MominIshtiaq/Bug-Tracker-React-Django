import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ProjectModal = ({
  handleShow,
  handleClose,
  show,
  handleSubmit,
  handleChange,
  formData,
  error,
  success,
}) => {
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        <i className="fa-solid fa-plus"></i> Create Project
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="projectName">Project name</Form.Label>
              <Form.Control
                type="text"
                id="projectName"
                name="name"
                placeholder="Enter project name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="shortDetails">Short details</Form.Label>
              <Form.Control
                as="textarea"
                id="shortDetails"
                rows={3}
                name="detail"
                placeholder="Enter details here"
                value={formData.detail}
                onChange={handleChange}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button type="submit" variant="primary">
                Add
              </Button>
              <Button type="reset" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProjectModal;
