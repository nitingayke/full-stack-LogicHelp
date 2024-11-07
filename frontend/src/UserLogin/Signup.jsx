import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import "./userLogin.css";
import { Link } from 'react-router-dom';

export default function Signup() {
    const [userSignp, setUserSignup] = useState({username: "", password: "", email: ""});

    const handleInputChange = (e) => {
        setUserSignup({...userSignp, [e.target.name]: e.target.value});
    }
    const handleSubmitbutton = () => {
        
    }
    return (
        <div className='col-12 d-flex justify-content-center align-items-center py-5'>
            <div className='login-box text-center'>

                <h2 className='text-secondary py-4 fw-semibold'>SignUp</h2>
                <div>
                    <TextField
                        label="Email"
                        id="outlined-size-small"
                        size="small"
                        className='col-11 pb-3'
                        name='email'
                        value={userSignp.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Username"
                        id="outlined-size-small"
                        size="small"
                        className='col-11 pb-3'
                        name='username'
                        value={userSignp.username}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Password"
                        className='col-11 pb-3'
                        id="outlined-size-small"
                        size="small"
                        type='password'
                        name='password'
                        value={userSignp.password}
                        onChange={handleInputChange}
                    />
            
                    <br />
                    <Button variant="contained" className='mb-4' onClick={handleSubmitbutton}>Signup</Button>
                </div>
                <button className='col-10 mb-2 d-flex align-items-center justify-content-center mx-auto account-open-btn'> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="" className='me-1' height={20} /><span className='text-light fs-16 py-2'>Sign Up With Google</span></button>
                <button className='col-10 mb-2 d-flex align-items-center justify-content-center mx-auto account-open-btn'><LinkedInIcon className='text-primary' /> <span className='text-light fs-16 py-2'>Sign Up With LinkedIn</span></button>

                <p>
                    <Link to={"/signup"} className='fs-16' >
                        <span>User dont have account yet</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}