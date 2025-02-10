import { Link,useNavigate } from "react-router-dom";
import { userAtom } from "./state/userAtom";
import { useRecoilState } from "recoil";

const Navbar = ()=> {

    const[user,setUser] =useRecoilState(userAtom);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    }

    return(
        <nav className="Navbar">
            <div className="Navbar-left">
                <Link to= "/" className= "Home-link">Home</Link>
            </div>
            <div className="Navbar-right">
                {user ? (
                <>
                <span className = "nav-text" >
                    Welcome, { user.username }!
                </span>
                <Link to ="#" onClick={handleLogout} className="nav-link" >
                Logout
                </Link>
                </>
            ) : (
                <>
                    <Link to = "/login" className="nav-link">Login</Link>
                    <Link to = "/register" className="nav-link">Signup</Link>
                </>
            )}
            </div>
        </nav>
    )
}

export default Navbar;