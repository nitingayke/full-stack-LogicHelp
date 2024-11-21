import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { timeSlince } from '../../functions';
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { toast, ToastContainer } from 'react-toastify';

import { io } from 'socket.io-client';
const socket = io('http://localhost:9658');

export default function SolveDoubtsBox({ doubts, loginUser }) {
    const [localDoubts, setLocalDoubts] = useState();
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setLocalDoubts(doubts);
    }, [doubts]);

    useEffect(() => {
        const handleUpdateComments = (data) => {
            if (data) {
                setLocalDoubts((prevDoubts) => ({
                    ...prevDoubts,
                    comments: [...prevDoubts.comments, data.newComment],
                }));
            }
        };

        const handleDoubtSolved = (data) => {
            if(data.status) {
                setLocalDoubts((prevDoubt) => ({
                    ...prevDoubt,
                    isSolve: true,
                }));
                toast.success('Doubt has been solved!');
            }
        }

        socket.on('update-comments', handleUpdateComments);
        socket.on('doubt-solved', handleDoubtSolved);

        return () => {
            socket.off('update-comments', handleUpdateComments);
            socket.off('doubt-solved', handleDoubtSolved);
        };
    }, [doubts?._id]);


    const handleReplyEvent = async () => {
        if (!inputValue.trim()) {
            toast.error('Reply message is required.');
            return;
        }

        if (inputValue.trim() === '#solve') {
            socket.emit('solved-doubt', { doubt_id: doubts?._id });
            return;
        }

        socket.emit('new-comment', {
            doubt_id: localDoubts?._id,
            user_id: loginUser?._id,
            message: inputValue,
        });
        setInputValue("");
    };

    return (
        <div className='bg-dark-gray p-2 rounded'>
            {!doubts ? (
                <div className='py-3'>
                    <h4 className='fs-1 text-center text-light-secondary opacity-75'>No Doubts Selected</h4>
                    <p className='text-center text-secondary fs-16'>
                        Solve user doubts to earn coins! For every doubt you solve, you will receive <span className='fw-bold'>5 coins</span>. Accumulate coins to unlock special rewards and showcase your expertise!
                    </p>
                    <p className='text-center fs-16'>
                        After solving a doubt, please make sure the doubt is marked as closed. For solved doubts, enter <span className='text-orange'>#solve</span>
                    </p>
                </div>
            ) : (
                <div className='p-2'>
                    <div className='d-flex align-items-center justify-content-between col-12 pb-2'>
                        <div className='d-flex align-items-center'>
                            <Avatar sx={{ bgcolor: deepPurple[500] }} className='me-2' alt={(localDoubts?.user?.username || '').toUpperCase()} src={doubts?.user?.image || '#'} />
                            <h4 className='text-break m-0 fw-semibold'>{localDoubts?.user?.username}</h4>
                        </div>
                        <p className='text-light-secondary m-0 fs-16'>{timeSlince(localDoubts?.createdAt)} ago</p>
                    </div>
                    {localDoubts?.isSolve ? (
                        <span className='fs-16 text-danger'>Solved</span>
                    ) : (
                        <span className='fs-16 text-info'>Open</span>
                    )}

                    <h6 className='text-break pt-2 m-0 text-orange'>
                        <span className='text-secondary'>Tag:</span> {localDoubts?.tag}
                    </h6>
                    <h6 className='text-break pt-2'>
                        <span className='text-secondary'>Title:</span> {localDoubts?.title}
                    </h6>
                    <p className='m-0 fs-16'>
                        <span className='text-secondary'>Message:</span>{localDoubts?.message}
                    </p>

                    <div className='fs-14 col-12 py-2 border-with-text'>
                        <span className='text-secondary px-2 border border-danger'>Doubt</span>
                    </div>

                    <List className='hide-scrollbar'>
                        {localDoubts?.comments.map((comment, index) => (
                            <ListItemButton key={index} alignItems="flex-start">
                                <ListItemAvatar>
                                    {
                                        (loginUser?._id === doubts.user._id)
                                            ? <Avatar sx={{ bgcolor: deepPurple[500] }} alt={(comment?.user?.username || '').toUpperCase()} src={comment?.user.image || '#'} />
                                            : <Avatar sx={{ bgcolor: deepOrange[500] }} alt={(comment?.user?.username || '').toUpperCase()} src={comment?.user.image || '#'} />
                                    }
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <div className='d-flex justify-content-between'>
                                            <h5>{comment?.user?.username}</h5>
                                            <span className='fs-14 text-secondary'>{timeSlince(comment?.createdAt)}</span>
                                        </div>
                                    }
                                    secondary={<div className='text-light-secondary m-0 bg-dark p-2 rounded-bottom rounded-end border border-secondary'>{comment.message}</div>}
                                />
                            </ListItemButton>
                        ))}
                    </List>

                    <div className="input-group pt-3">
                        {localDoubts?.isSolve ? (
                            <span className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 rounded-0 text-danger">This doubt has been closed.</span>
                        ) : (
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 text-light rounded-0"
                                placeholder={`Reply to: ${doubts.title}`}
                            />
                        )}
                        <button className="input-group-text p-0 bg-transparent border-secondary border-start-0 rounded-0" onClick={handleReplyEvent}>
                            <SendIcon className='fs-6 text-light m-2' />
                        </button>
                    </div>
                </div>
            )}

            <ToastContainer position='bottom-right' theme='colored' />
        </div>
    );
}
