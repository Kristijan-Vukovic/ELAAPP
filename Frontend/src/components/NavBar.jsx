import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../constants';

import './NavBar.css';
import { NavItem } from 'react-bootstrap';

function NavBar() {

    const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand 
            className='linkPocetna'
            onClick={()=>navigate(RoutesNames.HOME)}
        >
            ELA APP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={location.pathname} className="me-auto">
            <Nav.Link href={RoutesNames.PILOTI_PREGLED}>Piloti</Nav.Link>
            <Nav.Link href={RoutesNames.ZRAKOPLOVI_PREGLED}>Zrakoplovi</Nav.Link>
            <Nav.Link href={RoutesNames.LETOVI_PREGLED}>Letovi</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link target="_blank" href="http://kristijan1978-001-site1.htempurl.com/swagger/index.html">API dokumentacija</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;