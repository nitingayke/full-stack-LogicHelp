import React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { timeSlince } from '../../functions';
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

export default function SolveDoubtsBox({ doubts }) {

    return (
        <div className='bg-dark-gray p-2 rounded'>
            {(!doubts) ?
                <div className='py-3'>
                    <h4 className='fs-1 text-center text-light-secondary opacity-75'>No Doubts Selected</h4>
                    <p className='text-center text-secondary fs-16'>
                        Solve user doubts to earn coins! For every doubt you solve, you will receive <span className='fw-bold'>5 coins</span>. Accumulate coins to unlock special rewards and showcase your expertise!
                    </p>
                </div> :
                <div className='p-2 '>
                    <div className='d-flex align-items-center justify-content-between col-12 pb-2'>
                        <div className='d-flex align-items-center '>
                            <Avatar sx={{ bgcolor: deepOrange[500] }} className='me-2' alt={doubts?.username || "null"} src={doubts?.image}></Avatar>
                            <h4 className='text-break m-0 fw-semibold'>{doubts.username}</h4>
                        </div>
                        <p className='text-light-secondary m-0 fs-16'>Rank: {doubts.rank}</p>
                    </div>

                    <div className='col-12 d-flex justify-content-end'><i className='fs-16 text-light-secondary'>{timeSlince(doubts.createdAt)}</i></div>

                    <h6 className='text-break pt-2'><span className='text-secondary'>Title:</span> {doubts.title}</h6>
                    <p className='m-0 fs-16'><span className='text-secondary'>Message:</span>{doubts.message}</p>

                    <div className='fs-14 col-12 py-2 border-with-text'>
                        <span className='text-secondary px-2 border border-danger'>Doubt</span>
                    </div>

                    <List>
                        {doubts?.comments.map((comment, index) => (
                            <ListItemButton key={index} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar className='' alt={comment.username} src={comment.image} />
                                </ListItemAvatar>
                                <ListItemText primary={<h5>{comment.username}</h5>} secondary={<span className='text-light-secondary'>{comment.message}</span>} />
                            </ListItemButton>
                        ))}
                    </List>

                    <div className="input-group pt-3">
                        <input type="text" className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 text-light rounded-0" placeholder={`Reply to: ${doubts.title}`} />
                        <button className="input-group-text p-0 bg-transparent border-secondary border-start-0 rounded-0" ><SendIcon className='fs-6 text-light m-2' /></button>
                    </div>
                </div>
            }
        </div>
    )
}