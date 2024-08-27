/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../partials/Navbar";
import BugHeader from "./bug_dashboard_header/BugHeader";
import ApiService from "../../../services/index";
import BugTable from "./bug_dashboard_table/BugTable";

const Bug = () => {
  const params = useParams();
  const { project_id } = params;

  const [developers, setDevelopers] = useState([]);
  const [user, setUser] = useState({});
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState("");
  const [project, setProject] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await ApiService.fetchSingleProject(project_id);
        setProject(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProject();
  }, [project_id]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await ApiService.getDevelopers();
        setDevelopers(response.data);
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setError("You are not authorized to view this content.");
        } else {
          setError("An error occurred while fetching the developers.");
        }
      }
    };

    fetchDevelopers();
  }, []);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await ApiService.fetchBug(project_id);
        setBugs(response.data);
      } catch (err) {
        setError("Failed to fetch bugs");
        console.log(error);
        console.log(err);
      }
    };

    fetchBugs();
  }, [project_id, error]);

  useEffect(() => {
    const fetchUser = async () => {
      if (bugs && bugs.length > 0) {
        try {
          const response = await ApiService.fetchUser(bugs[0].assigned_to);
          setUser(response.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchUser();
  }, [bugs]);

  const handleStatusChange = async (bugId, newStatus) => {
    try {
      const response = await ApiService.changeBugStatus(bugId, newStatus);
      setBugs((prevBugs) =>
        prevBugs.map((bug) =>
          bug.id === bugId ? { ...bug, status: newStatus } : bug
        )
      );
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const handleDeleteBug = async (bugId) => {
    try {
      const response = await ApiService.deleteBug(bugId);
      setBugs((prevBugs) => prevBugs.filter((bug) => bug.id !== bugId));
    } catch (error) {
      console.error("Error deleting bug:", error);
    }
  };

  return (
    <>
      <NavBar />
      <BugHeader project={project} devList={developers} />
      <BugTable
        handleDeleteBug={handleDeleteBug}
        handleStatusChange={handleStatusChange}
        bugs={bugs}
        user={user}
      />
    </>
  );
};

export default Bug;
