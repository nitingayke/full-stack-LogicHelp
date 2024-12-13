import React, { useState } from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Avatar from '@mui/material/Avatar';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Link } from 'react-router-dom';

export default function UserData({ loginUser, currUser, handleChangeProfile }) {

    return (
        <>
            <div className="about-user p-2 rounded">
                <div className='d-flex flex-wrap'>
                    <div className='col-12 col-lg-auto p-2 profile-image-component position-relative'>
                        <Avatar
                            alt={currUser?.username}
                            src={currUser?.image}
                            sx={{ width: 140, height: 140 }}
                        />
                        <button
                            onClick={() => handleChangeProfile(true)}
                            className='bg-transparent border-0 position-absolute end-0 me-2 mb-2 bottom-0 profile-image-update' >
                            <ModeEditOutlineOutlinedIcon className='text-light fs-6' />
                        </button>
                    </div>
                    <div className='p-2 pt-3 flex-1 col-12 col-lg-auto'>
                        <div className='col-12 d-flex justify-content-between'>
                            <h4 className='m-0'>{currUser?.name}</h4>
                            <p className='fs-16 text-light-secondary m-0 pt-1 d-flex align-items-center'><PlaceOutlinedIcon className='fs-16' />{currUser?.country}</p>
                        </div>

                        {currUser?.about && <h5 className='mb-1 text-light-secondary py-1'>{currUser?.about}</h5>}
                        {currUser?.username && <p className='m-0 text-light-secondary fs-16'>{currUser?.username}</p>}

                    </div>
                </div>

                {
                    (loginUser?._id === currUser?._id)
                    && <Link to={`/user/edit-profile/${currUser?.username}`}><button className='col-12 mt-2 editprofile-button border-0 py-1 rounded '>Edit Profile</button></Link>
                }

            </div>
            <div className='mt-2'>
                <div className='about-user rounded p-1 d-flex'>
                    <p className='m-0 fs-5 ps-2 fw-semibold flex-1'>Rank: <span>{(currUser?.rank || "0").toLocaleString("en-IN")}</span></p>
                    <ul className='list-unstyled m-0 d-flex fs-14 pe-2'>
                        {currUser?.socialLink?.linkedIn && <li className='ms-2 p-1'>
                            <Link to={currUser?.socialLink?.linkedIn} className='text-secondary hover-orange'><LinkedInIcon className='fs-6' />LinkedIn</Link>
                        </li>}
                        {currUser?.socialLink?.github && <li className='ms-2 p-1'>
                            <Link to={currUser?.socialLink?.github} className='text-secondary hover-orange'><GitHubIcon className='fs-6' />Github</Link>
                        </li>}
                        {currUser?.socialLink?.portFolio && <li className='ms-2 p-1'>
                            <Link to={currUser?.socialLink?.portFolio} className='text-secondary hover-orange'><GitHubIcon className='fs-6' />PortFolio</Link>
                        </li>}
                    </ul>
                </div>
            </div>
        </>
    )
}