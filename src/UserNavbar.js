import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';
import { useState, useEffect } from 'react';

function UserNavbar() {
  const [activeLink, setActiveLink] = useState(getInitialActiveLink());

  function getInitialActiveLink() {
    // Extract the current route from the window's location.pathname
    return window.location.pathname;
  }

  const handleNavLinkClick = (href) => {
    setActiveLink(href);
  };

  useEffect(() => {
    // Update the active link when the route changes
    const handleRouteChange = () => {
      setActiveLink(getInitialActiveLink());
    };

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      // Cleanup event listener
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <Navbar expand="lg" bg="warning" data-bs-theme="light" sticky="top">
      <Container>
        <Image src="logo.png" style={{ width: '60px', height: '60px' }} />
        <Navbar.Brand href="/userhome">AutoDream</Navbar.Brand>
        <Navbar.Offcanvas placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link
                href="/userhome"
                onClick={() => handleNavLinkClick('/userhome')}
                style={{
                  textDecoration: activeLink === '/userhome' ? 'underline' : 'none',
                  borderRadius: '50px', 
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="/userproducts"
                onClick={() => handleNavLinkClick('/userproducts')}
                style={{
                  textDecoration: activeLink === '/userproducts' ? 'underline' : 'none',
                  borderRadius: '10px',
                }}
              >
                Shop
              </Nav.Link>
              <Nav.Link
                href="/userpurchase"
                onClick={() => handleNavLinkClick('/userpurchase')}
                style={{
                  textDecoration: activeLink === '/userpurchase' ? 'underline' : 'none',
                  borderRadius: '10px',
                }}
              >
                My Orders
              </Nav.Link>
              <Nav.Link
                href="/"
                onClick={() => handleNavLinkClick('/')}
                style={{
                  textDecoration: activeLink === '/' ? 'underline' : 'none',
                  borderRadius: '10px',
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default UserNavbar;

