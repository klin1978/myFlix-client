import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export const NavigationBar = ({ user, onLoggedOut}) => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='light'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {!user && (
              <>
                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                <Nav.Link as={Link} to='/signup'>Signup</Nav.Link>
              </>
            )}
          <Nav>
              {user && (
                <>
                  <Nav.Link as={Link} to='/'>Home</Nav.Link>
                  <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
                  <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                </>
              )}
          </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};