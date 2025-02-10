import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "./state/userAtom";


const Dashboard = () => {

    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate("/login")
        }

        },[user,navigate])
    if(!user) return null;

    return <div className="dashboard" >
        <h2>
            Welcome to your dashboard {user ? user.username : "User"}!
        </h2>
        <p>This is your dashboard where you can manage your appointements.</p>
        
    </div>
}

export default Dashboard;