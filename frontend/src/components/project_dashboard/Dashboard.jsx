import NavBar from "../partials/Navbar";
import { useEffect, useState } from "react";
import ApiService from "../../../services/index";
import DashboardHeader from "./project_dashboard_header/DashboardHeader";
import DashboardProject from "./project_dashboard_list_project/DashboardProject";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await ApiService.fetchProjects();
        setProjects(response.data);
        setAllProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <DashboardHeader setProjects={setProjects} allProjects={allProjects} />
      <DashboardProject
        projects={projects && projects.length > 0 ? projects : []}
      />
    </>
  );
};

export default Dashboard;
