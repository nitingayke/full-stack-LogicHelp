import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import { toast } from 'react-toastify';
import "./SharedComponent.css";

export default function Navbar({ loginUser, handleLoginUser }) {

    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const verifyUserLogin = async () => {
            const publicRoutes = ["/signup", "/login", "/logout"];
            try {
                const { data } = await axios.post(
                    "https://logichelp-backend.onrender.com",
                    {},
                    { withCredentials: true }
                );

                const { status, user } = data;
                if (status) {
                    handleLoginUser(user);
                } else {
                    handleLoginUser(null);
                }
            } catch (error) {
                
            }
        };

        verifyUserLogin();

    }, [location.pathname, navigate]);

    const Logout = async () => {

        if (!loginUser) {
            toast.error("You are not logged in.");
            return;
        }

        handleClose();
        try {

            setIsLoading(true);
            const { data } = await axios.post("https://logichelp-backend.onrender.com/user-logout", {}, { withCredentials: true });

            if (data?.success) {
                handleLoginUser(null);
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                navigate("/logout");
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='sticky-top dashboard-navbar'>
            <nav className="navbar navbar-expand-md col-12 col-lg-10 mx-auto px-3 px-lg-0">
                <div className="container-fluid  px-2 px-md-0">

                    <button className='bg-transparent border-0' type='button'>
                        <Link to={"/"} className="navbar-brand" >
                            <img src="https://res.cloudinary.com/dnpg99izj/image/upload/v1734178980/loginhelp_user_profiles/msl0p6yggut9q0ge1r3g.png" alt="" />
                        </Link>
                    </button>


                    <button className="navbar-toggler navbar-collapse-button border-0 ms-auto me-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" >
                        <MenuIcon className='fs-5' />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav ms-auto">

                            {
                                [
                                    { id: "navlink1", path: "/problem-solving/problems", label: "Problems" },
                                    { id: "navlink2", path: "/problem-solving/contest", label: "Contest" },
                                    { id: "navlink3", path: "/problem-solving/doubts", label: "Doubts" },
                                    { id: "navlink4", path: "/problem-solving/live-challenge", label: "Live Challenge" },
                                ].map((link) => (
                                    <li key={link?.id} className='nav-link redirect-link mt-3 mt-md-0'>
                                        <Link to={link.path}>
                                            <button className="bg-transparent border-0 text-secondary hover-orange" id={link.id}>{link.label}</button>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>

                    </div>
                    <ul className='d-flex align-items-center list-unstyled d-flex border-start mb-3 mt-3 m-md-0'>

                        <li>
                            <Link to={"/coins"} className='p-0 ps-2 nav-link d-flex justify-content-center'>
                                <MonetizationOnIcon className='fs-5 color-gold' />
                                <span className='color-gold mx-1 fs-6'>{(loginUser?.userProgress?.coins || 0)}</span>
                            </Link>
                        </li>

                        <li>
                            {
                                (!loginUser?.userProgress?.totalSreak) ? <span className='d-flex text-secondary fs-6 ms-1'><StarBorderIcon className='fs-5' /><span className='fs-6'>0</span> </span>
                                    : <span className='d-flex ms-1'><StarIcon className='fs-5 text-orange' /><span className='ms-1 fs-6 text-orange'>{loginUser?.userProgress?.totalSreak}</span> </span>
                            }
                        </li>

                        <li className='ps-2'>
                            {
                                (!loginUser) ?
                                    <p className='m-0'>
                                        <Link to={'/login'} className='user-login'>Login</Link>
                                    </p> :
                                    <div>
                                        {
                                            (isLoading)
                                                ? <div className="spinner-border spinner-border-sm m-2" ></div>
                                                : <>
                                                    <Button
                                                        id="basic-button"
                                                        aria-controls={open ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClick}
                                                        className='p-0 m-0'
                                                    >
                                                        <Avatar sx={{ bgcolor: deepOrange[500] }} alt={loginUser?.username} src={loginUser?.image || "https://"}></Avatar>
                                                    </Button>
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                        className='mt-2'
                                                    >
                                                        <MenuItem onClick={handleClose}>
                                                            <Link className='text-decoration-none text-dark' to={`user-profile/${loginUser?._id}`}>
                                                                <PortraitOutlinedIcon className='fs-5 me-1' />Profile
                                                            </Link>
                                                        </MenuItem>
                                                        <MenuItem onClick={Logout}><LogoutIcon className='fs-5 me-1' />Logout</MenuItem>
                                                    </Menu>
                                                </>
                                        }
                                    </div>
                            }
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}