import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Wrapper to keep the logo and button grouped on the left */}
      <div className="nav-left">
        <Link to="/" className="logo">
          DEV.cell
        </Link>
        
        
        <a 
          href="https://pc.iitmandi.co.in/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="retro-btn"
        >
          powered by KP
        </a>
      </div>

      <div className="nav-links">
        <Link to="/team">Team</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/gallery">Gallery</Link>
      </div>
    </nav>
  );
}

export default Navbar;