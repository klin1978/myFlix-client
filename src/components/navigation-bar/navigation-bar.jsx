import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export const NavigationBar = ({ user, onLoggedOut}) => {
  return (
    <Navbar bg='light' data-bs-theme='light'>
      <Container>
        <Navbar.Brand as={Link} to='/'><h1>myFlix App</h1></Navbar.Brand>
        <Nav className='justify-content-end'>
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
      </Container>
    </Navbar>
  );
};