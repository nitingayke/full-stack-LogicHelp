import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { Link } from 'react-router-dom';

import "./SharedComponent.css";

export default function Navbar({ loginUser }) {
    const [section, setSection] = useState("");

    const handleSection = (e) => {
        e.preventDefault();
        const currEle = e.currentTarget;
        const currId = currEle.id;

        if (section) {
            document.getElementById(section).classList.remove("selected-link");
        }
        if (currId != '') {
            currEle.classList.add("selected-link");
            setSection(currId);
        }
    }
    return (
        <div className='sticky-top dashboard-navbar'>
            <nav className="navbar navbar-expand-md col-12 col-lg-10 mx-auto px-3 px-lg-0">
                <div className="container-fluid  px-2 px-md-0">

                    <span onClick={handleSection} >
                        <Link to={"/"} className="navbar-brand" >
                            <img src="/assets/Logo.png" alt="" />
                        </Link>
                    </span>


                    <button className="navbar-toggler navbar-collapse-button border-0 ms-auto me-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" >
                        <MenuIcon className='fs-5' />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav ms-auto">
                            <li className="nav-link redirect-link mt-3 mt-md-0" onClick={handleSection} id='navlink1'>
                                <Link to={"/problem-solving/problems"}>Problems</Link>
                            </li>

                            <li className="nav-link redirect-link" onClick={handleSection} id='navlink2'>
                                <Link to={"/problem-solving/contest"}>Contest</Link>
                            </li>

                            <li className="nav-link redirect-link" onClick={handleSection} id='navlink3'>
                                <Link to={"/problem-solving/doubts"}>Doubts</Link>
                            </li>

                            <li className="nav-link redirect-link me-1 position-relative  mb-4 mb-md-0" onClick={handleSection} id='navlink4'>
                                <Link to={"/problem-solving/live-challenge"}>Live Challenge</Link>
                                <span className="position-absolute translate-middle red rounded-circle live"></span>
                            </li>
                        </ul>

                    </div>
                    <ul className='d-flex align-items-center list-unstyled d-flex border-start mb-3 mt-3 m-md-0'>

                        <li onClick={handleSection} >
                            <Link to={"/coins"} className='p-0 ps-2 nav-link d-flex justify-content-center'>
                                <MonetizationOnIcon className='fs-5 color-gold' />
                                <span className='color-gold mx-1 fs-6'>0</span>
                            </Link>
                        </li>

                        <li onClick={handleSection} >
                            <Link to={"/daily-problem"} className='p-0 ps-2 nav-link d-flex justify-content-center'>
                                {
                                    (!loginUser) ? <span className='d-flex text-secondary fs-6'><StarBorderIcon className='fs-5' /><span className=' mx-1 fs-6'>0</span> </span>
                                        : <span><StarIcon className='fs-5 color-orange' /><span className='color-orange mx-1 fs-6'>50</span> </span>
                                }
                            </Link>
                        </li>

                        <li className='ps-2'>
                            {
                                (!loginUser) ?
                                    <p className='m-0'>
                                        <Link to={'/login'} className='user-login'>Login</Link>
                                    </p> :
                                    <a href="/" className='nav-link d-flex navbar-user-profile p-0'>
                                        <Avatar sx={{ bgcolor: deepOrange[500] }} alt={'NitinGayke'} src='https://assets.leetcode.com/users/Nitin_Gayke/avatar_1729062514.png'>N</Avatar>
                                    </a>
                            }
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    )
}