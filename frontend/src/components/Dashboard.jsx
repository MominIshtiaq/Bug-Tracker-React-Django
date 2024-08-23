import NavBar from './Navbar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardHeader from './DashboardHeader';
import DashboardProject from './DashboardProject';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/projects/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProjects(response.data);
        setAllProjects(response.data)
      } catch (error) {
        console.error('Error fetching projects:', error);
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
      <DashboardHeader setProjects={setProjects} allProjects={allProjects}/>
      <DashboardProject  projects={projects && projects.length > 0 ? projects: []} />
    </>
  )
}

export default Dashboard