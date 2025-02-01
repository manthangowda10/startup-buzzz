import { TextField,Button } from "@mui/material";
import { useState } from "react";


const LoginPage = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = () => {
        console.log("Email: ",email);
        console.log("Password: ", password);
    }

    return(
         <div style ={{maxWidth:400, margin:"0 auto", padding:"20px"}}>
            <h2>Login</h2>
        <TextField 
        id="email" 
        label="Email" 
        variant="outlined"
        fullWidth
        margin="normal"
        value ={ email }
        onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
        id = "password"
        label = "Password"
        variant = "outlined"
        fullWidth
        margin="normal"
        value = {password}
        onChange={(e) => setPassword(e.target.value)} 
        
        />
        <Button 
        variant="contained"
        color = "primary"
        fullWidth
        onClick={handleLogin}
        style={{marginTop:20}}
        > Login </Button>
         </div>
    )
}

export default LoginPage;
