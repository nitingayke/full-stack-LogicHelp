import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Signup({ handleLoginUser }) {
    const [userSignp, setUserSignup] = useState({ username: "", password: "", email: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
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
                "https://loginhelp-backend.onrender.com/signup",
                { ...userSignp },
                { withCredentials: true }
            );

            const { success, message } = data;
            
            if (success) {
                navigate("/");
            } else {
                toast.error(message || "Signup failed. Please try again.");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("User already exists. Please try with a different email.");
            } else {
                toast.error("Failed to sign up. Please check your connection and try again.");
            }
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

                <p className='pb-3'>
                    <Link to={"/login"} className='fs-16 text-decoration-none'>
                        <span>Already have an account&#63; Login here</span>
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
