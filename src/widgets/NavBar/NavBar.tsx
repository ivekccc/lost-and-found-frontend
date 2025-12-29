import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import styles from './NavBar.module.css';
import useAuth from '../../shared/hooks/useAuth';

const NavBar: React.FC = () => {
  const isLoggedIn = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  return (
    <Navbar expand="lg" className={styles.navbar} sticky="top">
      <Container className={styles.container}>
        <div className={styles.left}>
          <Navbar.Brand href="/" className="d-flex flex-row align-items-center">
            <div className={styles.brandIcon}>🔍</div>
            <div className="d-flex flex-column">
              <h5 className={styles.brandTitle}>Lost and Found</h5>
              <span className={styles.brandSpan}>Find and report</span>
            </div>
          </Navbar.Brand>
        </div>
        <div className={styles.center}>
          <Nav className="mx-auto">
            <Nav.Link>Lost</Nav.Link>
            <Nav.Link>Found</Nav.Link>
            <Nav.Link>How it works</Nav.Link>
          </Nav>
        </div>
        <div className={styles.right}>
          <Nav>
            {isLoggedIn ? (
              <NavDropdown title="Menu" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              // Link container for login button
              <Nav.Link href="/login" className={styles.loginButton}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
export default NavBar;
