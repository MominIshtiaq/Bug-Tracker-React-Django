import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import ApiService from "../../../services/index";
import FeatureModel from "./FeatureModel";
import BugModel from "./BugModel";

const BugHeader = ({ project, devList }) => {
  const token = localStorage.getItem("token");
  const [featureFormData, setFeatureFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    type: "feature",
    status: "",
    project: "",
    created_by: token,
    assigned_to: "",
  });

  useEffect(() => {
    if (project && project.id) {
      setFeatureFormData((prevFormData) => ({
        ...prevFormData,
        project: project.id,
      }));
    }
  }, [project]);

  const [bugFormData, setBugFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    type: "bug",
    status: "",
    project: "",
    created_by: token,
    assigned_to: "",
  });

  useEffect(() => {
    if (project && project.id) {
      setBugFormData((prevFormData) => ({
        ...prevFormData,
        project: project.id,
      }));
    }
  }, [project]);

  const handleFeatureChange = (event) => {
    const { name, value } = event.target;
    setFeatureFormData({
      ...featureFormData,
      [name]: value,
    });
  };

  const handleBugChange = (event) => {
    const { name, value } = event.target;
    setBugFormData({
      ...bugFormData,
      [name]: value,
    });
  };

  const handleFeatureSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await ApiService.createBug(featureFormData);
      setFeatureFormData({
        title: "",
        description: "",
        deadline: "",
        type: "feature",
        status: "",
        project: project.id,
        created_by: token,
        assigned_to: "",
      });
      handleFeatureModalClose();
    } catch (error) {
      console.error(
        "Error adding bug:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleBugSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await ApiService.createBug(bugFormData);
      setBugFormData({
        title: "",
        description: "",
        deadline: "",
        type: "bug",
        status: "",
        project: project.id,
        created_by: token,
        assigned_to: "",
      });
      handleBugModalClose();
    } catch (error) {
      console.error(
        "Error adding bug:",
        error.response ? error.response.data : error.message
      );
    }
  };

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
        <Button variant="outline-secondary" className="me-1">
          <i className="fa-solid fa-gear"></i>
        </Button>
        <Button variant="outline-secondary" className="me-1">
          <i className="fa-solid fa-ellipsis"></i>
        </Button>
        <>
          <FeatureModel
            featureFormData={featureFormData}
            handleFeatureChange={handleFeatureChange}
            handleFeatureSubmit={handleFeatureSubmit}
            showFeatureModal={showFeatureModal}
            handleFeatureModalShow={handleFeatureModalShow}
            handleFeatureModalClose={handleFeatureModalClose}
            devList={devList}
          />

          <BugModel
            bugFormData={bugFormData}
            handleBugChange={handleBugChange}
            handleBugSubmit={handleBugSubmit}
            showBugModal={showBugModal}
            handleBugModalShow={handleBugModalShow}
            handleBugModalClose={handleBugModalClose}
            devList={devList}
          />
        </>
      </div>
    </Container>
  );
};
export default BugHeader;
