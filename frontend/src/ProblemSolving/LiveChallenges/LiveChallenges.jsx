import React, { useEffect, useState, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CreateNewChallenge from './CreateNewChallenge';
import { timeSlince } from '../../functions';
import List from '@mui/material/List';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CurrentChallenges from './CurrentChallenges';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import LinearProgress from '@mui/material/LinearProgress';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LiveChallenges({ loginUser }) {

    const socketRef = useRef(null); 

    const [open, setOpen] = useState(true);
    const [liveStream, setLiveStream] = useState([]);
    const [streamMessage, setStreamMessage] = useState("");
    const [isStreamLoading, setIsStreamLoading] = useState(false);
    const [challenges, setChallenges] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tempData, setTempData] = useState();
    const [liveStreamComment, setLiveStreamComment] = useState("");
    const [challengeLoading, setChallengeLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsStreamLoading(true);
                setChallengeLoading(true);

                const [streamRes, challengeRes] = await Promise.all([
                    axios.get('https://logichelp-backend.onrender.com/doubts/live-stream-message'),
                    axios.get('https://logichelp-backend.onrender.com/doubts/all-challenges')
                ]);

                setLiveStream(streamRes.data.streamMessage || []);
                setChallenges(challengeRes.data.totalChallenges || []);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsStreamLoading(false);
                setChallengeLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        socketRef.current = io('https://logichelp-backend.onrender.com');

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        const socket = socketRef.current;
        if (!socket) return;

        socket.on('added-livestream-message', (data) => {
            setLiveStream((prev) => {
                const updated = [...prev, data.newMessage];
                return updated.slice(-50);
            });
        });

        socket.on('created-new-live-challenge', (data) => {
            setChallenges((prev) => [data.newChallenge, ...prev]);
        });

        socket.on('edited-live-stream-comment', ({ comment_id, message }) => {
            setLiveStream((prev) =>
                prev.map((s) =>
                    s._id === comment_id ? { ...s, message } : s
                )
            );
            setIsDialogOpen(false);
        });

        socket.on('deleted-live-stream-comment', ({ comment_id }) => {
            setLiveStream((prev) =>
                prev.filter((s) => s._id !== comment_id)
            );
        });

        socket.on('edited-live-challenge', (data) => {
            const { challenge_id, title, textMessage, imageURL } = data;

            setChallenges((prev) =>
                prev.map((c) =>
                    c._id === challenge_id
                        ? { ...c, title, textMessage, imageURL }
                        : c
                )
            );
        });

        socket.on('deleted-selected-challenge', ({ challenge_id }) => {
            setChallenges((prev) =>
                prev.filter((c) => c._id !== challenge_id)
            );
        });

        socket.on('deleted-selected-challenge-comment', ({ challenge_id, comment_id }) => {
            setChallenges((prev) =>
                prev.map((c) =>
                    c._id === challenge_id
                        ? {
                            ...c,
                            result: c.result.filter((r) => r._id !== comment_id),
                        }
                        : c
                )
            );
        });

        socket.on('live-challenge-results-success', ({ result, challenge_id }) => {
            setChallenges((prev) =>
                prev.map((c) =>
                    c._id === challenge_id
                        ? { ...c, result: [...c.result, result] }
                        : c
                )
            );
        });

        return () => {
            socket.off(); 
        };
    }, []);

    const handleStreamMessage = () => {
        if (!loginUser?._id) {
            toast.error('Login required');
            return;
        }

        if (!streamMessage.trim()) {
            toast.error('Enter message');
            return;
        }

        socketRef.current.emit('livestream-message', {
            user_id: loginUser._id,
            message: streamMessage,
        });

        setStreamMessage('');
    };

    const handleTemporaryData = (id) => {
        setTempData(id);
        setLiveStreamComment(
            liveStream.find((e) => e._id === id)?.message || ""
        );
        setIsDialogOpen(true);
    };

    const handleLiveStreamEditComment = () => {
        socketRef.current.emit('edit-live-stream-comment', {
            comment_id: tempData,
            message: liveStreamComment,
        });
    };

    const handleLiveStreamDeleteComment = (comment_id) => {
        socketRef.current.emit('delete-live-stream-comment', {
            comment_id,
        });
    };

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

                        {
                            (challengeLoading)
                                ? <LinearProgress color="inherit" />
                                : <CurrentChallenges challenges={challenges} loginUser={loginUser} />
                        }
                    </div>
                </div>

                <div className='col-12 d-md-block col-md-4 ps-md-2'>
                    <div className='bg-dark-gray p-2 rounded'>
                        <div className='d-flex justify-content-between align-items-center border-bottom'>
                            <h4 className='fw-semibold m-0 p-1'>Live Stream</h4>
                            <div className="spinner-grow spinner-grow-sm text-danger" ></div>
                        </div>
                        <List className='height-80 overflow-auto hide-scrollbar'>
                            {
                                (isStreamLoading)
                                    ? <div className='text-center py-5'>
                                        <div className="spinner-grow text-danger" ></div>
                                    </div>
                                    : (liveStream || [])?.map((stream, index) => (

                                        <div key={index}>
                                            <div className='d-flex col-12'>
                                                <Avatar
                                                    alt={(stream?.user?.username || "").toUpperCase()}
                                                    sx={{ bgcolor: deepPurple[300] }}
                                                    src={stream?.user?.image || '#'}
                                                />
                                                <div className='ps-3 flex-1'>
                                                    <div className='d-flex justify-content-between flex-1'>
                                                        <Link className='text-decoration-none text-light hover-orange text-break fs-5' to={`/user-profile/${stream?.user?._id}`} >{stream?.user?.username}</Link>
                                                        <span className='fs-14 text-secondary'>{timeSlince(stream?.createdAt)}</span>
                                                    </div>
                                                    <div className="mt-2 fs-16 text-light-secondary m-0 bg-dark p-2 rounded-bottom rounded-end border border-secondary">
                                                        {stream?.message}
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                (stream?.user?._id === loginUser?._id) && <div className='col-12 d-flex justify-content-end pb-2 mt-1'>
                                                    <Tooltip title='Edit Comment.'>
                                                        <button onClick={() => handleTemporaryData(stream?._id)} className='fs-14 px-2 bg-transparent border-0 text-secondary hover-orange'>Edit</button>
                                                    </Tooltip>
                                                    <Tooltip title='Delete Comment.'>
                                                        <button onClick={() => handleLiveStreamDeleteComment(stream?._id)} className='fs-14 px-2 bg-transparent border-0 text-secondary hover-orange me-2'>Delete</button>
                                                    </Tooltip>
                                                </div>
                                            }
                                        </div>
                                    ))
                            }
                        </List>
                        <div className="input-group pt-2">
                            <input type="text" value={streamMessage} onChange={(e) => setStreamMessage(e.target.value)} className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 text-light rounded-0" placeholder='live stream comment..' />
                            {
                                ((streamMessage || "").length > 0)
                                    ? <button onClick={handleStreamMessage} className="input-group-text p-0 bg-transparent border-secondary border-start-0 rounded-0"><SendIcon className='fs-6 text-orange m-2' /></button>
                                    : <button className="input-group-text p-0 bg-transparent border-secondary border-start-0 rounded-0"><SendIcon className='fs-6 text-secondary m-2' /></button>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={isDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setIsDialogOpen(false)}
                aria-describedby="alert-dialog-slide-description"
                maxWidth='md'
                fullWidth
            >
                <div className='bg-dark'>
                    <DialogTitle className='text-light'>{"Edit Live Stream Comment."}</DialogTitle>
                    <DialogContent>
                        <textarea
                            className='col-12 text-light bg-transparent p-2'
                            rows={3}
                            placeholder='Comment'
                            value={liveStreamComment}
                            onChange={(e) => setLiveStreamComment(e.target.value)}
                        ></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsDialogOpen(false)} className='border text-light'>Cancel</Button>
                        <Button onClick={handleLiveStreamEditComment} className='border border-orange color-orange me-3'>Edit</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}