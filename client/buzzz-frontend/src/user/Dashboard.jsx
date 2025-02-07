import { useState,useEffect } from "react";

import(useState)

const Dashboard = () => {

    const [user,setUser] = useState(null);

    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
    })

    return <div className="dashboard" >
        <h2>
            Welcome to your dashboard{user ? user : "User"}!
        </h2>
        <p>This is your dashboard where you can manage your appointements.</p>
    </div>
}

export default Dashboard;