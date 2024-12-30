import TextField from '@mui/material/TextField';

const RegisterPage = () => {
    return <div className = "register">
        <div className='name'>
        <TextField id="name" label="Enter your name" variant="outlined"  />
        </div>
        <div className='number'>
        <TextField id="number" label="Enter your number" variant="outlined" />
        </div>
        <div className='password'>
        <TextField id="password" label="Enter your password" variant="outlined" />
        </div>
    </div>
}

export default RegisterPage;