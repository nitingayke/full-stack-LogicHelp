import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import "./userLogin.css";
import { Link, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Signup({ handleLoginUser }) {
    const [userSignp, setUserSignup] = useState({ username: "", password: "", email: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setUserSignup({ ...userSignp, [e.target.name]: e.target.value });
    };

    const handleSubmitbutton = async () => {
        if (!userSignp.email || !userSignp.username || !userSignp.password) {
            toast.error("Username, email, and password are required");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(userSignp.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        try {
            setIsLoading(true);
            const { data } = await axios.post(
                "http://localhost:9658/signup",
                { ...userSignp },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                useNavigate("/");
            } else {
                toast.error(message || "Signup failed. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to sign up. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
        setUserSignup({ username: "", password: "", email: "" });
    };

    return (
        <div className='col-12 d-flex justify-content-center align-items-center py-5'>
            <div className='login-box text-center'>
                <h2 className='py-4 fw-semibold text-orange'>SignUp</h2>
                <div>
                    <TextField
                        label="Email"
                        id="email-field"
                        size="small"
                        className='col-11 pb-3'
                        name='email'
                        value={userSignp.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Username"
                        id="username-field"
                        size="small"
                        className='col-11 pb-3'
                        name='username'
                        value={userSignp.username}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Password"
                        id="password-field"
                        size="small"
                        type='password'
                        className='col-11 pb-3'
                        name='password'
                        value={userSignp.password}
                        onChange={handleInputChange}
                    />

                    <br />
                    <Button variant="contained" className='mb-4' onClick={handleSubmitbutton}>Signup</Button>
                </div>
                <button type="button" className='col-10 mb-2 d-flex align-items-center justify-content-center mx-auto account-open-btn'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="" className='me-1' height={20} />
                    <span className='fs-16 py-2'>Sign Up With Google</span>
                </button>
                <button type="button" className='col-10 mb-2 d-flex align-items-center justify-content-center mx-auto account-open-btn'>
                    <LinkedInIcon className='text-primary' />
                    <span className='fs-16 py-2'>Sign Up With LinkedIn</span>
                </button>

                <p className='pb-3'>
                    <Link to={"/login"} className='fs-16 text-decoration-none'>
                        <span>move to login page</span>
                    </Link>
                </p>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Backdrop
                sx={(theme) => ({ color: '#7cf140', zIndex: theme.zIndex.drawer + 1 })}
                open={isLoading}
            >
                <CircularProgress
                    color="inherit"
                    size={50}
                    thickness={5}
                />
            </Backdrop>
        </div>
    );
}
