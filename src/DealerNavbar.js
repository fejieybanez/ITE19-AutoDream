import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';

function DealerNavbar() {
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg="warning" variant="light" sticky="top">
      <Container>
        <Image src='logo.png' style={{ width: '60px', height: '60px' }} />
        <Navbar.Brand href="/dealerhome">AutoDream</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/dealerhome">Vehicles</Nav.Link>
            <Nav.Link href="/dealerinventory">Inventory</Nav.Link>
            <Nav.Link href="/dealersales">Sales</Nav.Link>
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DealerNavbar;
