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
        console.log("Number:". number)
    }
    return <div className = "register">
        <div className='name'>
        <TextField 
        id="name" 
        label="Enter your name" 
        variant="outlined" 
        fullWidth
        margin = "normal"
        value = {firstName}
        onChange={(e) => setfirstName(e.target.value)}
        />
        </div>
        <div className='number'>
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
        <div className='password'>
        <TextField 
        id="password" 
        type = "password" 
        label="Enter your password" 
        variant="outlined" 
        fullWidth
        value = {password}
        onChange = {(e) => setPassword(e.target.value)}
        />
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