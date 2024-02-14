import { Container, Navbar } from 'react-bootstrap';
import Image from 'next/image';
import Logo from '../../../public/603d193ecbd63b4a1d33f557_clint-logo-azul.svg'

function Header() {
  return (
    <Navbar bg="terciary" variant="Secondary" expand="lg" sticky="top" style={{ width: '100%', position: 'relative' }}>
      <Container>
        <Navbar.Brand href="#home">Kanban - <Image src={Logo} /></Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;