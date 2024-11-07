import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import "./userLogin.css";
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className='col-12 d-flex justify-content-center align-items-center py-5'>
            <div className='login-box text-center'>

                <div className='col-12'>
                    <AccountCircleIcon className='user-icon' />
                </div>
                <div>
                    <TextField
                        label="Email"
                        id="outlined-size-small"
                        size="small"
                        className='col-11 pb-3'
                    />
                    <TextField
                        label="Password"
                        className='col-11 pb-3'
                        id="outlined-size-small"
                        size="small"
                    />
                    <br />
                    <Button variant="contained" className='mb-4'> <LoginIcon className='pe-1 fs-5' />Login</Button>
                </div>
                <button className='col-10 mb-2 d-flex align-items-center justify-content-center mx-auto account-open-btn'> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="" className='me-1' height={20} /><span className='text-light fs-16 py-2'>Log In With Google</span></button>
                <button className='col-10 mb-2 d-flex align-items-center justify-content-center mx-auto account-open-btn'><LinkedInIcon className='text-primary'/><span className='text-light fs-16 py-2'>Log In With LinkedIn</span></button>

                <p>
                    <Link to={"/signup"} className='fs-16' >
                        <span>User dont have account yet</span>
                    </Link>
                </p>
            </div>
        </div>
    )
}