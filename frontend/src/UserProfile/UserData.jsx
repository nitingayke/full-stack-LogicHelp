import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

export default function UserData({ loginUser }) {

    return (
        <>
            <div className="about-user p-2 rounded">
                <div className='d-flex flex-wrap'>
                    <div className='col-12 col-lg-auto p-2'>
                        <Avatar
                            alt={loginUser?.username}
                            src={loginUser?.image}
                            sx={{ width: 140, height: 140 }}
                        />
                    </div>
                    <div className='p-2 pt-3 flex-1 col-12 col-lg-auto'>
                        <div className='col-12 d-flex justify-content-between'>
                            <h4 className='m-0'>{loginUser?.name}</h4>
                            <p className='fs-16 text-light-secondary m-0 pt-1 d-flex align-items-center'><PlaceOutlinedIcon className='fs-16' />{loginUser?.country}</p>
                        </div>

                        {loginUser?.about && <h5 className='mb-1 text-light-secondary py-1'>{loginUser?.about}</h5>}
                        {loginUser?.username && <p className='m-0 text-light-secondary fs-16'>{loginUser?.username}</p>}

                    </div>
                </div>
                <Link to={`/user/edit-profile/${loginUser?.username}`}><button className='col-12 mt-2 editprofile-button border-0 py-1 rounded '>Edit Profile</button></Link>
            </div>
            <div className='mt-2'>
                <div className='about-user rounded p-1 d-flex'>
                    <p className='m-0 fs-5 ps-2 fw-semibold flex-1'>Rank: <span>{(loginUser?.rank || "0").toLocaleString("en-IN")}</span></p>
                    <ul className='list-unstyled m-0 d-flex fs-14 pe-2'>
                        {loginUser?.socialLink?.linkedIn && <li className='ms-2 p-1'>
                            <Link to={loginUser?.socialLink?.linkedIn} className='text-secondary hover-orange'><LinkedInIcon className='fs-6' />LinkedIn</Link>
                        </li>}
                        {loginUser?.socialLink?.github && <li className='ms-2 p-1'>
                            <Link to={loginUser?.socialLink?.github} className='text-secondary hover-orange'><GitHubIcon className='fs-6' />Github</Link>
                        </li>}
                        {loginUser?.socialLink?.portFolio && <li className='ms-2 p-1'>
                            <Link to={loginUser?.socialLink?.portFolio} className='text-secondary hover-orange'><GitHubIcon className='fs-6' />PortFolio</Link>
                        </li>}
                    </ul>
                </div>
            </div>
        </>
    )
}