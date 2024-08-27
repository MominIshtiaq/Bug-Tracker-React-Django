import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const BugModel = ({
  bugFormData,
  handleBugChange,
  handleBugSubmit,
  showBugModal,
  handleBugModalShow,
  handleBugModalClose,
  devList,
}) => {
  console.log(bugFormData);
  return (
    <div>
      <Button variant="primary" onClick={handleBugModalShow}>
        <i className="fa-solid fa-plus"></i> Add Bug
      </Button>

      <Modal show={showBugModal} onHide={handleBugModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Bug</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleBugSubmit}>
            <Form.Group className="mb-3" controlId="bugName">
              <Form.Label>Bug Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter bug name"
                value={bugFormData.title}
                onChange={handleBugChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bugDetails">
              <Form.Label>Bug Details</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                placeholder="Enter details here"
                value={bugFormData.description}
                onChange={handleBugChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bugStatus">
              <Form.Label>Bug Status</Form.Label>
              <Form.Select name="status" onChange={handleBugChange}>
                <option defaultValue={""}>Choose a status</option>
                <option value="new">New</option>
                <option value="started">Started</option>
                <option value="resolved">Resolved</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="assignedDev">
              <Form.Label>Assign Developer</Form.Label>
              <Form.Select name="assigned_to" onChange={handleBugChange}>
                <option defaultValue={""}>Choose a Developer</option>
                {devList.map((dev) => (
                  <option key={dev.id} value={dev.id}>
                    {dev.username}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="bugDeadline">
              <Form.Label>Bug Deadline</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={bugFormData.deadline}
                onChange={handleBugChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button type="submit" variant="primary">
                Add
              </Button>
              <Button variant="outline-secondary" onClick={handleBugModalClose}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BugModel;
