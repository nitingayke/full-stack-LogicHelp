import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { toast } from "react-toastify";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Login({ handleLoginUser }) {
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const { email, password } = inputValue;
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleLoginEvent = async () => {

        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        try {
            setIsLoading(true);
            const { data } = await axios.post(
                "https://logichelp-backend.onrender.com/login",
                {
                    email,
                    password,
                },
                { withCredentials: true }
            );
            const { success, message, user } = data;

            if (success) {
                setInputValue({ email: "", password: "" });
                handleLoginUser(user);
                navigate("/");
            }
            else {
                toast.error(message || "Error logging in");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error logging in");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='col-12 d-flex justify-content-center align-items-center py-5'>
            <div className='login-box text-center'>

                <div className='col-12'>
                    <AccountCircleIcon className='user-icon text-orange' />
                </div>
                <div>
                    <TextField
                        label="Email"
                        size="small"
                        className='col-11 pb-3'
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                    />
                    <TextField
                        label="Password"
                        className='col-11 pb-3'
                        size="small"
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        type="password"
                    />
                    <br />
                    <Button variant="contained" className='mb-4' onClick={handleLoginEvent}>
                        <LoginIcon className='pe-1 fs-5' />Login
                    </Button>
                </div>

                <p className=''>
                    <Link to={"/signup"} className='fs-16 text-decoration-none'>
                        <span>Don't have an account&#63; Sign up here</span>
                    </Link>
                </p>

                <p className='pb-3'>
                    <Link to={"/logout"} className='fs-16 text-decoration-none'>
                        <span>Know More About the Application</span>
                    </Link>
                </p>
            </div>

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
