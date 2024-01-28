import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';

function UserNavbar() {
  return (
    <Navbar expand="lg" bg="warning" data-bs-theme="light" sticky="top">
      <Container>
        <Image src='logo.png' style={{width: '60px', height: '60px'}}/> 
        <Navbar.Brand href="/userhome">AutoDream</Navbar.Brand>
            <Navbar.Offcanvas bplacement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                    Offcanvas
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/userhome">Home</Nav.Link>
                        <Nav.Link href="/userproducts">Shop</Nav.Link>
                        <Nav.Link href="/userpurchase">My Orders</Nav.Link>
                        <Nav.Link href="/">Logout</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
    </Navbar>
  );
}

export default UserNavbar;
