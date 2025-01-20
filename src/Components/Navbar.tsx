import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Nav activeKey="/">
      <Nav.Item>
        <Nav.Link as={Link} to="/">
          Todo List
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/settings">
          Settings
        </Nav.Link>
      </Nav.Item>
      {/* <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item> */}
    </Nav>
  );
};

export default Navbar;
