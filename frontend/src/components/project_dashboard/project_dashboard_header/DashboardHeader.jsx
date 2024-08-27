/* eslint-disable react/prop-types */
import Container from "react-bootstrap/Container";
import { useState, useCallback } from "react";
import ApiService from "../../../../services/index";
import SearchComponent from "./project_dashboard_header_search_component/SearchComponent";
import ProjectModal from "./project_dashboard_header_modal/ProjectModal";
import { useNavigate } from "react-router-dom";

const DashboardHeader = ({ setProjects, allProjects }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const token = localStorage.getItem("token");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    manager: token,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearch = async (query) => {
    if (query === "") {
      setProjects(allProjects);
    } else {
      try {
        const response = await ApiService.searchProjects(query);
        setProjects(response.data);
      } catch (error) {
        console.error("Error searching projects:", error);
      }
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 1000), [
    allProjects,
  ]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await ApiService.createProject(formData);

      setSuccess("Project added successfully!");
      setError("");
      setFormData({
        name: "",
        detail: "",
        manager: formData.manager,
      });
      setShow(false);
      navigate(0);
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.error ||
            "An error occurred while adding the project."
        );
      } else {
        setError("Network error. Please try again later.");
      }
      setSuccess("");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="d-flex justify-content-between align-items-center ps-3 border-start border-3 border-success mt-3">
      <p>
        Projects
        <br />
        Hi DeVisnext, welcome to ManageBug
      </p>
      <SearchComponent
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
      />
      <ProjectModal
        handleShow={handleShow}
        handleClose={handleClose}
        show={show}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        error={error}
        success={success}
      />
    </Container>
  );
};

export default DashboardHeader;
