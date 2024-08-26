import PropTypes from 'prop-types'
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import { useState, useEffect } from "react"
import axios from "axios"
import ApiService from '../../services/index'


const BugHeader = ({projectid, devList}) => {
  const [project, setProject] = useState({})
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await ApiService.fetchSingleProject(projectid)
        setProject(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProject();
}, [projectid]);

    const token = localStorage.getItem('token')
    const [featureFormData, setFeatureFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        type: 'feature',
        status: '',
        project: projectid,
        created_by: token,
        assigned_to: ''
    })

    const [bugFormData, setBugFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        type: 'bug',
        status: '',
        project: projectid,
        created_by: token,
        assigned_to: ''
    })

    const handleFeatureChange = (event) => {
        const {name, value} = event.target
        setFeatureFormData({
            ...featureFormData,
            [name]:value
        })
    }

    const handleBugChange = (event) => {
        const {name, value} = event.target
        setBugFormData({
            ...bugFormData,
            [name]:value
        })
    }

    const handleFeatureSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await ApiService.createBug(featureFormData)
            setFeatureFormData({
                title: '',
                description: '',
                deadline: '',
                type: 'feature',
                status: '',
                project: projectid,
                created_by: token,
                assigned_to: ''
            });
            handleFeatureModalClose();
        } catch (error) {
            console.error('Error adding bug:', error.response ? error.response.data : error.message);
        }
    }

    const handleBugSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await ApiService.createBug(bugFormData)
            setBugFormData({
                title: '',
                description: '',
                deadline: '',
                type: 'bug',
                status: '',
                project: projectid,
                created_by: token,
                assigned_to: ''
            });
            handleFeatureModalClose();
        } catch (error) {
            console.error('Error adding bug:', error.response ? error.response.data : error.message);
        }
    }

    const [showFeatureModal, setShowFeatureModal] = useState(false);
    const [showBugModal, setShowBugModal] = useState(false);
  
    const handleFeatureModalClose = () => setShowFeatureModal(false);
    const handleFeatureModalShow = () => setShowFeatureModal(true);
    const handleBugModalClose = () => setShowBugModal(false);
    const handleBugModalShow = () => setShowBugModal(true);
  
    return (
      <Container className="d-flex justify-content-between align-items-center ps-3 border-start border-3 border-success mt-3">
        <div>
          <p className="text-secondary-emphasis">
            <a className="text-decoration-none text-secondary" href="">
              Project &nbsp;
            </a> 
            <i className="fa-solid fa-angle-right"></i> &nbsp;
            {project.name}
          </p>
          <h4>All Bugs Listing</h4>
        </div>
        <div>
          <Button variant="outline-secondary" className="me-1"><i className="fa-solid fa-gear"></i></Button>
          <Button variant="outline-secondary" className="me-1"><i className="fa-solid fa-ellipsis"></i></Button>
            <>
              <Button variant="primary" className="me-1" onClick={handleFeatureModalShow}>
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
                      <Form.Control type="text"
                       name="title" 
                       placeholder="Enter Feature title" 
                       value={featureFormData.title}
                       onChange={handleFeatureChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="featureDetails">
                      <Form.Label>Feature Details</Form.Label>
                      <Form.Control as="textarea" 
                      name="description" 
                      rows={3} 
                      placeholder="Describe the feature in detail..."
                      value={featureFormData.description}
                      onChange={handleFeatureChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="featureStatus">
                      <Form.Label>Feature Status</Form.Label>
                      <Form.Select name="status" onChange={handleFeatureChange}>
                        <option defaultValue={''}>Choose a status</option>
                        <option value="new">New</option>
                        <option value="started">Started</option>
                        <option value="completed">Completed</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="assignedDev">
                      <Form.Label>Assign Developer</Form.Label>
                      <Form.Select name="assigned_to" onChange={handleFeatureChange}>
                        <option defaultValue={''}>Choose a Developer</option>
                        {devList.map(dev => (
                          <option key={dev.id} value={dev.id}>{dev.username}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="featureDeadline">
                      <Form.Label>Feature Deadline</Form.Label>
                      <Form.Control type="date"
                       name="deadline"
                       value={featureFormData.deadline}
                       onChange={handleFeatureChange} />
                    </Form.Group>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <Button type="submit" variant="primary">Add</Button>
                      <Button variant="outline-secondary" onClick={handleFeatureModalClose}>Cancel</Button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal>
  
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
                      <Form.Control type="text" 
                      name="title" 
                      placeholder="Enter bug name" 
                      value={bugFormData.title}
                      onChange={handleBugChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bugDetails">
                      <Form.Label>Bug Details</Form.Label>
                      <Form.Control as="textarea" 
                      name="description" 
                      rows={3} 
                      placeholder="Enter details here"
                      value={bugFormData.description}
                      onChange={handleBugChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bugStatus">
                      <Form.Label>Bug Status</Form.Label>
                      <Form.Select name="status" onChange={handleBugChange}>
                        <option defaultValue={''}>Choose a status</option>
                        <option value="new">New</option>
                        <option value="started">Started</option>
                        <option value="resolved">Resolved</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="assignedDev">
                      <Form.Label>Assign Developer</Form.Label>
                      <Form.Select name="assigned_to" onChange={handleBugChange}>
                        <option defaultValue={''}>Choose a Developer</option>
                        {devList.map(dev => (
                          <option key={dev.id} value={dev.id}>{dev.username}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bugDeadline">
                      <Form.Label>Bug Deadline</Form.Label>
                      <Form.Control type="date" 
                      name="deadline"
                      value={bugFormData.deadline}
                      onChange={handleBugChange} />
                    </Form.Group>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <Button type="submit" variant="primary">Add</Button>
                      <Button variant="outline-secondary" onClick={handleBugModalClose}>Cancel</Button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal>
            </>
        </div>
      </Container>
    );
};

BugHeader.propTypes = {
  projectid: PropTypes.string.isRequired,
  devList: PropTypes.array.isRequired
}


export default BugHeader