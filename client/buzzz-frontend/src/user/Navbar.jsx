import { Link } from "react-router-dom";

const Navbar = ()=> {
    return(
        <nav className="Navbar">
            <div className="Navbar-left">
                <Link to= "/" className= "Home-link">Home</Link>
            </div>
            <div className="Navbar-right">
                <Link to = "/login" className="nav-link">Login</Link>
                <Link to = "/signup" className="nav-link">Signup</Link>
            </div>
        </nav>
    )
}

export default Navbar;