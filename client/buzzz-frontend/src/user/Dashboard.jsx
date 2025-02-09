import { useState,useEffect } from "react";
import { Navigate } from "react-router-dom";


const Dashboard = () => {

    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
    },[navigate])
    const handleLogout =() =>{
        localStorage.removeItem("user");
        navigate("/login");
    }

    return <div className="dashboard" >
        <h2>
            Welcome to your dashboard{user ? user : "User"}!
        </h2>
        <p>This is your dashboard where you can manage your appointements.</p>
        <button onClick={handleLogout}> Logout</button>
    </div>
}

export default Dashboard;