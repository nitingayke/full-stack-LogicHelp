import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { timeSlince } from '../../functions';
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { toast, ToastContainer } from 'react-toastify';

export default function SolveDoubtsBox({ doubts }) {

    const [replay, setReplay] = useState();
    
    const handleReplyEvent = async() => {
        if (!replay) {
            toast.error("Reply message are required.");
            return;
        }

        if (replay.trim() === '#solve') {
            doubts.isSolve = true;
            return ;
        }

        
        setReplay();
    }

    console.log(doubts);
    return (
        <div className='bg-dark-gray p-2 rounded'>
            {(!doubts) ?
                <div className='py-3'>
                    <h4 className='fs-1 text-center text-light-secondary opacity-75'>No Doubts Selected</h4>
                    <p className='text-center text-secondary fs-16'>
                        Solve user doubts to earn coins! For every doubt you solve, you will receive <span className='fw-bold'>5 coins</span>. Accumulate coins to unlock special rewards and showcase your expertise!
                    </p>
                    <p className='text-center fs-16'>
                        After solving a doubt, please make sure the doubt is marked as closed. For solved doubts, enter <span className='text-orange'>#solve</span>
                    </p>
                </div>
                :
                <div className='p-2 '>
                    <div className='d-flex align-items-center justify-content-between col-12 pb-2'>
                        <div className='d-flex align-items-center '>
                            <Avatar sx={{ bgcolor: deepPurple[500] }} className='me-2' alt={(doubts?.user?.username || "").toUpperCase()} src={doubts?.user?.image || '#'}></Avatar>
                            <h4 className='text-break m-0 fw-semibold'>{doubts?.user?.username}</h4>
                        </div>
                        <p className='text-light-secondary m-0 fs-16'>{timeSlince(doubts.createdAt)} ago</p>
                    </div>
                    {
                        (doubts?.isSolve)
                            ? <span className='fs-16 text-danger'>Solve</span>
                            : <span className='fs-16 text-info'>Open</span>
                    }

                    <h6 className='text-break pt-2 m-0 text-orange'><span className='text-secondary'>Tag:</span> {doubts.tag}</h6>
                    <h6 className='text-break pt-2'><span className='text-secondary'>Title:</span> {doubts.title}</h6>
                    <p className='m-0 fs-16'><span className='text-secondary'>Message:</span>{doubts.message}</p>

                    <div className='fs-14 col-12 py-2 border-with-text'>
                        <span className='text-secondary px-2 border border-danger'>Doubt</span>
                    </div>

                    <List >
                        {doubts?.comments.map((comment, index) => (
                            <ListItemButton key={index} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: deepPurple[500] }} alt={comment.username} src={comment.image} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <div className='d-flex justify-content-between'>
                                            <h5>{comment.username}</h5>
                                            <span className='fs-14 text-secondary'>{timeSlince(comment?.createdAt)}</span></div>
                                    }
                                    secondary={
                                        <span className='text-light-secondary'>{comment.message}</span>
                                    }
                                />
                            </ListItemButton>
                        ))}
                    </List>

                    <div className="input-group pt-3">
                        {
                            (doubts?.isSolve)
                            ? <span className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 rounded-0 text-danger" >This doubt has been closed.</span> 
                            : <input type="text" value={replay} onChange={(e) => setReplay(e.target.value)} className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 text-light rounded-0" placeholder={`Reply to: ${doubts.title}`} />
                        }
                        <button className="input-group-text p-0 bg-transparent border-secondary border-start-0 rounded-0" onClick={handleReplyEvent} ><SendIcon className='fs-6 text-light m-2' /></button>
                    </div>
                </div>
            }

            <ToastContainer position='bottom-right' theme='colored' />
        </div>
    )
}