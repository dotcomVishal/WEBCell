import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        DEV.cell
      </Link>

      <div className="nav-links">
        <Link to="/team">Team</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/gallery">Gallery</Link>
      </div>
    </nav>
  );
}

export default Navbar;