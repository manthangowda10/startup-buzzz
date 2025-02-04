import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const RegisterPage = () => {

        const [firstName,setfirstName] = useState("");
        const [number, setNumber] = useState("");
        const [password,setPassword] = useState("");
    

    const handleRegister = () => {
        console.log("Name:", firstName);
        console.log("Number:", number);
        console.log("Number:", number)
    }
    return <div className = "register">
        <h2>Register</h2>
        <div className='input-field'>
        <TextField 
        id="name" 
        label="Enter your name" 
        variant="outlined" 
        fullWidth
        value = {firstName}
        onChange={(e) => setfirstName(e.target.value)}
        />
        </div>
        <div className='input-field'>
        <TextField 
        id="number" 
        type = "tel" 
        label="Enter your number" 
        variant="outlined" 
        fullWidth
        value = {number}
        onChange= {(e) => setNumber(e.target.value)}
        />
        </div>
        <div className='input-field'>
        <TextField 
        id="password" 
        type = "password" 
        label="Enter your password" 
        variant="outlined" 
        fullWidth
        value = {password}
        onChange = {(e) => setPassword(e.target.value)}
        />
        </div>
        <div className='button-container'>
        <Button
        type = "submit"
        variant='contained'
        color = 'primary'
        fullWidth
        style={{marginTop:20}}
        onClick={handleRegister}
        >Register</Button>
        </div>
    </div>
}

export default RegisterPage;