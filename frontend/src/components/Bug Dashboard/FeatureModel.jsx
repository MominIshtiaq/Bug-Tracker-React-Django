import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const FeatureModel = ({
  featureFormData,
  setFeatureFormData,
  handleFeatureChange,
  handleFeatureSubmit,
  showFeatureModal,
  setShowFeatureModel,
  handleFeatureModalShow,
  handleFeatureModalClose,
  devList,
}) => {
  return (
    <div>
      <Button
        variant="primary"
        className="me-1"
        onClick={handleFeatureModalShow}
      >
        <i className="fa-solid fa-plus"></i> Add Feature
      </Button>

      <Modal show={showFeatureModal} onHide={handleFeatureModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Feature</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFeatureSubmit}>
            <Form.Group className="mb-3" controlId="featureName">
              <Form.Label>Feature Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter Feature title"
                value={featureFormData.title}
                onChange={handleFeatureChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="featureDetails">
              <Form.Label>Feature Details</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                placeholder="Describe the feature in detail..."
                value={featureFormData.description}
                onChange={handleFeatureChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="featureStatus">
              <Form.Label>Feature Status</Form.Label>
              <Form.Select name="status" onChange={handleFeatureChange}>
                <option defaultValue={""}>Choose a status</option>
                <option value="new">New</option>
                <option value="started">Started</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="assignedDev">
              <Form.Label>Assign Developer</Form.Label>
              <Form.Select name="assigned_to" onChange={handleFeatureChange}>
                <option defaultValue={""}>Choose a Developer</option>
                {devList.map((dev) => (
                  <option key={dev.id} value={dev.id}>
                    {dev.username}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="featureDeadline">
              <Form.Label>Feature Deadline</Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={featureFormData.deadline}
                onChange={handleFeatureChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button type="submit" variant="primary">
                Add
              </Button>
              <Button
                variant="outline-secondary"
                onClick={handleFeatureModalClose}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FeatureModel;
