import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const RegisterPage = () => {

        const [fullName,setFullName] = useState("");
        const [email,setEmail] = useState("");
        const [username,setUsername] = useState("");
        const [phone, setPhone] = useState("");
        const [password,setPassword] = useState("");
    

    const handleRegister = async() => {
        const userData = {
            name: fullName,
            email,
            username,
            phone,
            password
        };
        try {
            const response = await fetch("http://localhost:3000/user/signup",{
                method: "POST",
                headers:{ "Content-Type":"application/json"},
                body:JSON.stringify(userData)
            })
            const data = await response.json();
            if(response.ok){
                alert("Registration successfull")
            } else {
                alert("Error registering " + data.message)
            }
        } catch (error) {
            console.error("Registration error", error);
            alert("Something went wrong, Please try again")
        }
    }
    return <div className = "register">
        <h2>Register</h2>
        <div className='input-field'>
        <TextField 
        id="name" 
        label="Enter your name" 
        variant="outlined" 
        fullWidth
        value = {fullName}
        onChange={(e) => setFullName(e.target.value)}
        />
        </div>
        <div className='input-field'>
        <TextField 
        id="email" 
        label="Enter your email" 
        variant="outlined" 
        fullWidth
        value = {email}
        onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className='input-field'>
        <TextField 
        id="username" 
        label="Enter your username" 
        variant="outlined" 
        fullWidth
        value = {username}
        onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className='input-field'>
        <TextField 
        id="phone" 
        type = "tel" 
        label="Enter your phone" 
        variant="outlined" 
        fullWidth
        value = {phone}
        onChange= {(e) => setPhone(e.target.value)}
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