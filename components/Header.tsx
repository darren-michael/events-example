import { Container, Nav, Navbar, NavDropdown} from "react-bootstrap"

const Header: React.FC<{}> = () => (
<Navbar expand="lg" className="bg-body-tertiary" style={{marginBottom: "20px"}}>
<Container>
  <Navbar.Brand href="/">Darren Michael<br/>Code Examples</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse  id="basic-navbar-nav">
    <Nav style={{width: "100%"}} className="justify-content-end" >
      <Nav.Link href="/">Home</Nav.Link>
      <NavDropdown title="Events" id="basic-nav-dropdown">
        <NavDropdown.Item href="/events">Events Calendar</NavDropdown.Item>
        <NavDropdown.Item href="/events/manage">
          Manage Events
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>
);
  
export default Header;

