import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout/')
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className='flex-grow-1' onClick={()=> navigate('/dashboard')}><strong>Manage</strong>Bug</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav className="flex-grow-1 text-center">
            <Nav.Link onClick={()=> navigate('/dashboard')}><i className="fa-brands fa-stack-overflow"></i> Projects</Nav.Link>
            <Nav.Link href="#link"><i className="fa-solid fa-list-check"></i> Tasks</Nav.Link>
            <Nav.Link href="#link"><i className="fa-solid fa-bars-progress"></i>  Manage</Nav.Link>
            <Nav.Link href="#link"><i className="fa-solid fa-user"></i> Payments</Nav.Link>
          </Nav>
          <Nav className='flex-grow-1 text-end'>
          <Nav.Link href=""><i className="fa-solid fa-bell"></i></Nav.Link>
          <Nav.Link href=""><i className="fa-solid fa-envelope"></i></Nav.Link>
          <NavDropdown title="" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

};

export default NavBar;
