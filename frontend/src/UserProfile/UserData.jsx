import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

export default function UserData({ loginUser }) {

    return (
        <div className="about-user p-2 rounded">
            <div className='d-flex flex-wrap'>
                <div className='col-12 col-lg-auto p-2'>
                    <Avatar
                        alt={loginUser?.username}
                        src={loginUser?.image}
                        sx={{ width: 140, height: 140 }}
                    />
                </div>
                <div className='p-2 flex-1 col-12 col-lg-auto'>
                    <div className='col-12 d-flex justify-content-between'>
                        <h4 className='m-0'>{loginUser?.name}</h4>
                        <p className='fs-16 text-light-secondary m-0 pt-1 d-flex align-items-center'><PlaceOutlinedIcon className='fs-16' />{loginUser?.country}</p>
                    </div>

                    {loginUser?.about && <p className='mb-1 text-light-secondary'>{loginUser?.about}</p>}
                    {loginUser?.username && <p className='m-0 text-light-secondary'>{loginUser?.username}</p>}

                    <div className='d-flex justify-content-between align-items-center col-12 pt-3'>

                        <p className='m-0 fw-semibold'>Rank: <span>{(loginUser?.rank || "0").toLocaleString("en-IN")}</span></p>

                        <ul className='list-unstyled m-0 d-flex fs-14 '>
                            {loginUser?.socialLink?.linkedin && <li className='ms-2 bg-dark p-1'>
                                <Link to={loginUser?.socialLink?.linkedIn} className='text-secondary'><LinkedInIcon className='fs-6' />LinkedIn</Link>
                            </li>}
                            {loginUser?.socialLink?.github && <li className='ms-2 bg-dark p-1'>
                                <Link to={loginUser?.socialLink?.github} className='text-secondary'><GitHubIcon className='fs-6' />Github</Link>
                            </li>}
                        </ul>
                    </div>
                </div>
            </div>
            <Link to={`edit-profile/${loginUser?._id}`}><button className='col-12 mt-2 editprofile-button border-0 py-1 rounded '>Edit Profile</button></Link>
        </div>
    )
}