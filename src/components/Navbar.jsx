
import { Link, useLocation } from "react-router-dom"

export const Navbar = () => {
    const location = useLocation();

    return (
    <nav className="navbar">   
        <div className="navbar-brand">
            <Link className="brand-link" to="/">
                🔉 Music Prayer
            </Link>
        </div>
        <div className="navbar-links">
            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">All Songs</Link>
            <Link className={`nav-link ${location.pathname === '/playlists' ? 'active' : ''}`} to="/playlists">Play Lists</Link>
        </div>
    </nav>
    )
}
  