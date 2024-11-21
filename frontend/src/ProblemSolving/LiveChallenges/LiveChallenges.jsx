import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CreateNewChallenge from './CreateNewChallenge';
import { timeSlince } from '../../functions';
import List from '@mui/material/List';
import SendIcon from '@mui/icons-material/Send';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CurrentChallenges from './CurrentChallenges';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { io } from 'socket.io-client';
const socket = io('http://localhost:9658');

export default function LiveChallenges({ loginUser }) {
    const [open, setOpen] = useState(true);
    const [liveStream, setLiveStream] = useState([]);
    const [streamMessage, setStreamMessage] = useState("");
    const [isStreamLoading, setIsStreamLoading] = useState(false);
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        const getLiveStreamComments = async () => {
            try {
                setIsStreamLoading(true);
                const res = await axios.get('http://localhost:9658/doubts/live-stream-message');
                if (res.status === 200) {
                    setLiveStream(res.data.streamMessage);
                }
            } catch (error) {
                toast.error(error.message || 'An error occurred while featching stream message.');
            } finally {
                setIsStreamLoading(false);
            }
        }
        getLiveStreamComments();

        const getChallenges = async () => {
            try {
                const res = await axios.get('http://localhost:9658/doubts/all-challenges');
                if (res.status === 200) {
                    setChallenges(res.data.totalChallenges);
                }
            } catch (error) {
                toast.error(error.message || 'An error occurred while featching challenges.');
            }
        }
        getChallenges();

        socket.on('added-livestream-message', (data) => {
            setLiveStream((prev) => {
                const newStream = [...prev, data.newMessage];
                return newStream.length > 100 ? newStream.slice(-100) : newStream; 
            });
            
        });

        socket.on('created-new-live-challenge', (data) => {
            setChallenges((prev) => [data.newChallenge, ...prev]);
        })

        return () => {
            socket.off('added-livestream-message');
            socket.off('created-new-live-challenge');
        }
    }, [loginUser]);

    const handleStreamMessage = () => {
        if (!streamMessage) {
            toast.error('please enter message.');
            return
        }

        socket.emit('livestream-message', {
            user_id: loginUser._id,
            message: streamMessage,
        });
        setStreamMessage('');
    }

    return (
        <div className='col-12 col-lg-10 mx-auto'>
            {
                open && <div className='text-warning bg-light-gold border border-warning p-2 fs-16 m-2 position-relative' >
                    <button className='position-absolute end-0 top-0 bg-transparent border-0 hover-component' onClick={() => setOpen(false)}><CloseIcon className='text-light m-1 fs-6' /></button>
                    <ul className="mb-0">
                        <li>
                            <span className="fw-bold">Important:</span> If your challenge is related to web development, make sure to deploy it and share the link.
                        </li>
                        <li>
                            The challenge must not contain duplicate problems or similar solutions.
                        </li>
                        <li>
                            To create a challenge, you must have solved at least 400 DSA problems with a rank greater than 5000.
                        </li>
                        <li className="text-danger">
                            <span className="fw-bold">Note:</span> Completing challenges will affect your rank and increase your coins. You will earn coins (e.g., +5) for each challenge you complete, and your rank will increase based on your challenge solutions.
                        </li>
                    </ul>
                </div>
            }

            <div className='p-2 d-flex flex-wrap'>

                <div className='col-12 col-md-8'>
                    <div className='bg-dark-gray p-2 rounded mb-2'>
                        <CreateNewChallenge loginUser={loginUser} />
                    </div>

                    <div className='bg-dark-gray p-2 rounded mb-2'>

                        <div className='d-flex justify-content-between align-items-center border-bottom border-secondary'>
                            <h4 className='fw-semibold p-2 text-info m-0'>Live Challenge <ChecklistIcon className='fs-3 ms-1' /></h4>
                            <span className='p-2 text-secondary fs-16'>Length: {(challenges || []).length}</span>
                        </div>

                        <CurrentChallenges challenges={challenges} loginUser={loginUser} />
                    </div>
                </div>

                <div className='d-none d-md-block col-md-4 ps-2'>
                    <div className='bg-dark-gray p-2 rounded'>
                        <div className='d-flex justify-content-between align-items-center border-bottom'>
                            <h4 className='fw-semibold m-0 p-1'>Live Stream</h4>
                            <div className="spinner-grow spinner-grow-sm text-danger" role="status"></div>
                        </div>
                        <List className='height-80 overflow-auto hide-scrollbar'>
                            {
                                (isStreamLoading)
                                    ? <div className='text-center py-5'>
                                        <div className="spinner-grow text-danger" role="status"></div>
                                    </div>
                                    : (liveStream || [])?.map((stream, index) => (
                                        <ListItemButton key={index} alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt={stream?.user?.username} sx={{ bgcolor: deepPurple[300] }} src={stream?.user?.image || '#'} />
                                            </ListItemAvatar>
                                            <ListItemText primary={
                                                <div className='d-flex justify-content-between'>
                                                    <h5 className='m-0 text-break'>{stream?.user?.username}</h5>
                                                    <span className='fs-14 text-secondary'>{timeSlince(stream?.createdAt)}</span>
                                                </div>
                                            }
                                                secondary={
                                                    <div className='text-light-secondary m-0 bg-dark p-2 rounded-bottom rounded-end mt-2 border border-secondary'>{stream?.message}
                                                    </div>
                                                }
                                            />
                                        </ListItemButton>
                                    ))
                            }
                        </List>
                        <div className="input-group pt-2">
                            <input type="text" value={streamMessage} onChange={(e) => setStreamMessage(e.target.value)} className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 text-light rounded-0" placeholder='live stream comment..' />
                            <button onClick={handleStreamMessage} className="input-group-text p-0 bg-transparent border-secondary border-start-0 rounded-0"><SendIcon className='fs-6 text-light m-2' /></button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position='bottom-right' theme='colored' />
        </div>
    )
}