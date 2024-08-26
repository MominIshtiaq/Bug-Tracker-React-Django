import axios from 'axios';

class ApiService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    });
  }

  signup(formData) {
    return this.service.post('/users/', formData);
  }

  login(formData) {
    return this.service.post('/login/', formData);
  }

  fetchProjects() {
    const token = localStorage.getItem('token');
    return this.service.get('/projects/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchSingleProject(projectid) {
    return this.service.get(`/projects/${projectid}`)
  }

  searchProjects(query) {
    const token = localStorage.getItem('token');
    return this.service.get(`/projects/search/?q=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createProject(formData) {
    const token = localStorage.getItem('token');
    return this.service.post('/projects/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  getDevelopers() {
    const token = localStorage.getItem('token');
    return this.service.get('/developers/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  createBug(formData) {
    const token = localStorage.getItem('token');
    return this.service.post('/bug/', formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization : `Bearer ${token}`
      }
    })
  }

  fetchBug(projectid) {
    const token = localStorage.getItem('token');
    return this.service.get(`/bug/${projectid}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  fetchUser(userId) {
    const token = localStorage.getItem('token');
    return this.service.get(`/users/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  changeBugStatus(bugId, newStatus) {
    const token = localStorage.getItem('token');
    return this.service.post(`/bug/${bugId}/change-status/`, { status: newStatus }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  deleteBug(bugId) {
    return this.service.delete(`/bug/${bugId}/delete-bug/`)
  }
}

export default new ApiService();
