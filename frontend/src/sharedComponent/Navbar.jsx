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
import { useCookies } from "react-cookie";
import axios from "axios";
import "./SharedComponent.css";

export default function Navbar({ loginUser, handleLoginUser }) {
    const [selected, setSelectedButton] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [cookies, removeCookie] = useCookies([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const verifyCookie = async () => {

            const publicRoutes = ["/signup", "/login", "/logout"];

            if (!cookies.token) {
                if (!publicRoutes.includes(location.pathname)) {
                    navigate("/logout");
                }
                return;
            }

            try {
                const { data } = await axios.post(
                    "http://localhost:9658",
                    {},
                    { withCredentials: true }
                );

                const { status, user } = data;

                if (status) {
                    handleLoginUser(user);
                } else {
                    handleLoginUser(null);
                    removeCookie("token");

                    if (!publicRoutes.includes(location.pathname)) {
                        navigate("/login");
                    }
                    return;
                }
            } catch (error) {
                removeCookie("token");
                navigate("/logout");
            }
        };

        verifyCookie();

    }, [cookies, location.pathname, navigate, removeCookie]);

    const Logout = () => {
        removeCookie("token");
        handleLoginUser(null);
        handleClose();
        navigate("/logout");
    };


    const handleSelectButton = (e) => {
        const currEle = e.currentTarget;
        const currId = currEle.id;

        if (selected) {
            document.getElementById(selected).classList.remove("selected-link");
        }
        if (currId) {
            currEle.classList.add("selected-link");
            setSelectedButton(currId);
        }
    }

    return (
        <div className='sticky-top dashboard-navbar'>
            <nav className="navbar navbar-expand-md col-12 col-lg-10 mx-auto px-3 px-lg-0">
                <div className="container-fluid  px-2 px-md-0">

                    <span onClick={handleSelectButton} >
                        <Link to={"/"} className="navbar-brand" >
                            <img src="/assets/Logo.png" alt="" />
                        </Link>
                    </span>


                    <button className="navbar-toggler navbar-collapse-button border-0 ms-auto me-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" >
                        <MenuIcon className='fs-5' />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav ms-auto">
                            <li className="nav-link redirect-link mt-3 mt-md-0" onClick={handleSelectButton} id='navlink1'>
                                <Link to={"/problem-solving/problems"}>Problems</Link>
                            </li>

                            <li className="nav-link redirect-link" onClick={handleSelectButton} id='navlink2'>
                                <Link to={"/problem-solving/contest"}>Contest</Link>
                            </li>

                            <li className="nav-link redirect-link" onClick={handleSelectButton} id='navlink3'>
                                <Link to={"/problem-solving/doubts"}>Doubts</Link>
                            </li>

                            <li className="nav-link redirect-link me-1 position-relative  mb-4 mb-md-0" onClick={handleSelectButton} id='navlink4'>
                                <Link to={"/problem-solving/live-challenge"}>Live Challenge</Link>
                                <span className="position-absolute translate-middle red rounded-circle live"></span>
                            </li>
                        </ul>

                    </div>
                    <ul className='d-flex align-items-center list-unstyled d-flex border-start mb-3 mt-3 m-md-0'>

                        <li onClick={handleSelectButton} >
                            <Link to={"/coins"} className='p-0 ps-2 nav-link d-flex justify-content-center'>
                                <MonetizationOnIcon className='fs-5 color-gold' />
                                <span className='color-gold mx-1 fs-6'>{(loginUser?.userProgress?.coins || 0)}</span>
                            </Link>
                        </li>

                        <li onClick={handleSelectButton} >
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
                                            <MenuItem onClick={handleClose}><PortraitOutlinedIcon className='fs-5 me-1' />Profile</MenuItem>
                                            <MenuItem onClick={Logout}><LogoutIcon className='fs-5 me-1' />Logout</MenuItem>
                                        </Menu>
                                    </div>
                            }
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    )
}