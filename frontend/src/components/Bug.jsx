/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import NavBar from "./Navbar"
import BugHeader from "./BugHeader"
import axios from "axios"
import BugTable from "./BugTable"


const Bug = () => {
    const params = useParams()
    const {project_id} = params

    const [developers, setDevelopers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDevelopers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/developers/', {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                setDevelopers(response.data);
            } catch (err) {
                if (err.response && err.response.status === 403) {
                    setError('You are not authorized to view this content.');
                } else {
                    setError('An error occurred while fetching the developers.');
                }
            }
        };

        fetchDevelopers();
    }, []);

    return (
        <>
            <NavBar />
            <BugHeader projectid={project_id} devList={developers}/>
            <BugTable projectid={project_id}/>
        </>
  )
}

export default Bug