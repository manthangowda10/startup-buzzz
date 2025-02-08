import { useState,useEffect } from "react";
import { Navigate } from "react-router-dom";

import(useState)

const Dashboard = () => {

    const [user,setUser] = useState(null);

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
    })
    const handleLogout =() =>{
        localStorage.removeItem("user");
        Navigate("/login");
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