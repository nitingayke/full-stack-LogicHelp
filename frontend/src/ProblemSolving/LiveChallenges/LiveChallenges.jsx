import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CreateNewChallenge from './CreateNewChallenge';
import { challenges, liveStreamData, timeSlince } from '../../functions';
import List from '@mui/material/List';
import SendIcon from '@mui/icons-material/Send';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CurrentChallenges from './CurrentChallenges';

export default function LiveChallenges() {
    const [open, setOpen] = useState(true);

    return (
        <div className='col-12 col-lg-10 mx-auto'>
            {open && <div className='text-warning bg-light-gold border border-warning p-2 fs-16 m-2 position-relative' >
                <button className='position-absolute end-0 top-0 bg-transparent border-0 hover-component' onClick={() => setOpen(false)}><CloseIcon className='text-light m-1 fs-6' /></button>
                <ul className="mb-0">
                    <li>
                        <span className="fw-bold">Important:</span> If your challenge is related to web development, make sure to deploy it and share the link.
                    </li>
                    <li>
                        The challenge must not contain duplicate problems or similar solutions. Any repeat challenges will be flagged.
                    </li>
                    <li>
                        To create a challenge, you must have solved at least 400 DSA problems with a rank greater than 5000.
                    </li>
                    <li className="text-danger">
                        <span className="fw-bold">Note:</span> Completing challenges will affect your rank and increase your coins. You will earn coins (e.g., +5) for each challenge you complete, and your rank will increase based on your challenge solutions.
                    </li>
                </ul>
            </div>}

            <div className='p-2 d-flex flex-wrap'>

                <div className='col-12 col-md-8'>
                    <div className='bg-dark-gray p-2 rounded mb-2'>
                        <CreateNewChallenge />
                    </div>

                    <div className='bg-dark-gray p-2 rounded mb-2'>

                        <div className='d-flex justify-content-between align-items-center border-bottom border-secondary'>
                            <h4 className='fw-semibold p-2 text-info m-0'>Live Challenge <ChecklistIcon className='fs-3 ms-1' /></h4>
                            <span className='p-2 text-secondary fs-16'>Length: {(challenges || []).length}</span>
                        </div>

                        <CurrentChallenges challenges={challenges}/>
                    </div>
                </div>

                <div className='d-none d-md-block col-md-4 ps-2'>
                    <div className='bg-dark-gray p-2 rounded'>
                        <div className='d-flex justify-content-between align-items-center border-bottom'>
                            <h4 className='fw-semibold m-0 p-1'>Live Stream</h4>
                            <span className='fs-16 text-secondary'>Live {(liveStreamData || []).length}</span>
                        </div>
                        <List className='height-80 overflow-auto hide-scrollbar'>
                            {liveStreamData?.map((user, index) => (
                                <ListItemButton key={index} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={user?.username} sx={{ bgcolor: deepPurple[300] }} src={user?.image} />
                                    </ListItemAvatar>
                                    <ListItemText primary={<div className='d-flex justify-content-between'><h5 className='m-0 text-break'>{user?.username}</h5><span className='fs-14 text-secondary'>{timeSlince(user?.createdAt)}</span></div>} secondary={<span className='text-light-secondary'>{user.message}</span>} />
                                </ListItemButton>
                            ))}
                        </List>
                        <div className="input-group pt-2">
                            <input type="text" className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 text-light rounded-0" placeholder='Type your live stream comment here...' />
                            <button className="input-group-text p-0 bg-transparent border-secondary border-start-0 rounded-0"><SendIcon className='fs-6 text-light m-2' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}