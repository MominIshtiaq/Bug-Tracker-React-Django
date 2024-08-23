/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { useState, useCallback } from 'react';
import axios from 'axios';

const DashboardHeader = ({setProjects, allProjects}) => {
    const [searchTerm, setSearchTerm] = useState('')

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            if(timeout) clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay)
        }
    }

    const token = localStorage.getItem('token');
    const [show, setShow] = useState(false);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        detail: '',
        manager: token
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSearch = async (query) => {
        if (query === '') {
            // Reset to full project list if search is cleared
            setProjects(allProjects);
          } else {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/projects/search/?q=${query}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setProjects(response.data);
        } catch (error) {
          console.error('Error searching projects:', error);
        }
    }
        
    };

    const debouncedSearch = useCallback(debounce(handleSearch, 1000), [allProjects]);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/projects/', formData, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            });
    
            setSuccess('Project added successfully!');
            setError('');
            setFormData({
                name: '',
                detail: '',
                manager: formData.manager
            });
            setShow(false);
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || 'An error occurred while adding the project.');
            } else {
                setError('Network error. Please try again later.');
            }
            setSuccess('');
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container className="d-flex justify-content-between align-items-center ps-3 border-start border-3 border-success mt-3">
            <p>Projects<br />Hi DeVisnext, welcome to ManageBug</p>
            <Form className="d-flex" role="search" method="POST">
                <input
                    className="form-control"
                    type="search"
                    id="search-input"
                    name="search-input"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </Form>
                <>
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
                                {error && <p className='text-danger'>{error}</p>}
                                {success && <p className='text-success'>{success}</p>}
                                <div className="d-flex justify-content-end gap-2 mt-3">
                                    <Button type="submit" variant="primary">Add</Button>
                                    <Button type="reset" variant="secondary" onClick={handleClose}>Cancel</Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
        </Container>
    );
};

export default DashboardHeader;
