import { Container, Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top" style={{ width: '100%' }}>
      <Container>
        <Navbar.Brand href="#home">Kanban - Clint</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;