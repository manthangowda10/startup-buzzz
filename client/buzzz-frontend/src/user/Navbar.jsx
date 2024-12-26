import { Link } from "react-router-dom";

const Navbar = ()=> {
    return(
        <nav style = {{ padding: '1rem', backgroundColor: `#eee`}}>
            <Link to = "/">Home</Link> | <Link to = "/login">Login</Link> | <Link to = "/register">Signup</Link>
        </nav>
    )
}

export default Navbar;