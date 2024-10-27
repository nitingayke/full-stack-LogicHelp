import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Link } from 'react-router-dom';
import { currUser } from './CurrUser';

export default function UserData() {
    return (
        <div className="about-user p-2 rounded">
            <div className='d-flex flex-wrap'>
                <div>
                    {/* <AccountCircleIcon className='user-image'/> */}
                    <img src={currUser.image} height={150} className='rounded-circle p-2' alt="" />
                </div>
                <div className='p-2 flex-1'>
                    <div className='col-12 d-flex justify-content-between'>
                        <h4 className='m-0'>{currUser.name}</h4>
                        <p className='fs-16 text-light-secondary m-0 pt-1 d-flex align-items-center'><PlaceOutlinedIcon className='fs-16' />{currUser.country}</p>
                    </div>

                    <p className='mb-1 text-light-secondary'>{currUser.about}</p>
                    <p className='m-0 text-light-secondary'>{currUser.username}</p>

                    <div className='d-flex justify-content-between align-items-center col-12 pt-3'>

                        <p className='m-0 fw-semibold'>Rank: <span>{(currUser.rank).toLocaleString("en-IN")}</span></p>

                        <ul className='list-unstyled m-0 d-flex fs-14 '>
                            <li className='ms-2 bg-dark p-1'>
                                <Link to={currUser.socialLink.linkedin} className='text-secondary'><LinkedInIcon className='fs-6' />LinkedIn</Link>
                            </li>
                            <li className='ms-2 bg-dark p-1'>
                                <Link to={currUser.socialLink.github} className='text-secondary'><PlaceOutlinedIcon className='fs-6' />Github</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <button className='col-12 mt-2 editprofile-button border-0 py-1 rounded '>Edit Profile</button>
        </div>
    )
}