import { TextField,Button } from "@mui/material";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            navigate("/dashboard");
        }
    },[navigate])

    const handleLogin = async() => {
        
        const userData = {
            email,
            password
        }
        try {
            const response = await fetch("http://localhost:3000/user/login",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(userData)
            })
            const data = await response.json();
            if(response.ok){
                localStorage.setItem("user",JSON.stringify(data.user))
                alert("Login successful");
                navigate("/dashboard")
                window.location.reload();
            } else {
                alert("Error Logging in " + data.message)
            }
        } catch (error) {
            console.error("Login error"+ error.message)
            alert("Something went wrong, please try again")
        }
    }

    return(
         <div className="login">
            <h2>Login</h2>
            <div className="input-field" >  
                <TextField 
                id="email" 
                label="Email" 
                variant="outlined"
                fullWidth
                type = "email"
                value ={ email }
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        <div className="input-field" >
        <TextField 
        id = "password"
        label = "Password"
        variant = "outlined"
        fullWidth
        type = "password"
        value = {password}
        onChange={(e) => setPassword(e.target.value)} 
        />
        </div>
        <div className="button-container" >
        <Button 
        variant="contained"
        color = "primary"
        fullWidth
        onClick={handleLogin}
        style={{marginTop:20}}
        > Login </Button>
        </div>
         </div>
    )
}

export default LoginPage;
