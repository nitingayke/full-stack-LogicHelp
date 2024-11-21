import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { timeSlince } from '../../functions';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Link } from 'react-router-dom';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import GroupIcon from '@mui/icons-material/Group';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from 'react-toastify';

import { io } from 'socket.io-client';
const socket = io('http://localhost:9658');

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function CurrentChallenges({ challenges, loginUser }) {

    const [open, setOpen] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [challengeSolution, setChallengeSolution] = useState("");
    const [projectDeployLink, setProjectDeployLink] = useState("");

    useEffect(() => {
        socket.on('live-challenge-results-success', (data) => {
            setSelectedChallenge((prev) => ({
                ...prev,
                result: [...prev.result, data.result],
            }));
            console.log(data);
        });

        return () => {
            socket.off('live-challenge-results-success');
        }

    }, [loginUser]);

    const handleSelectedChallenge = (challenge) => {
        setSelectedChallenge(challenge);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSendEvent = () => {
        if (!challengeSolution) {
            toast.error("Please enter your solution before submitting.");
            return;
        }

        socket.emit('live-challenge-results', {
            user_id: loginUser._id,
            challenge_id: selectedChallenge._id,
            challengeSolution,
            projectDeployLink,
        });
        setChallengeSolution("");
        setProjectDeployLink("");

    }

    return (
        <div>

            <List>
                {challenges?.map((challenge, index) => (
                    <ListItemButton key={index} alignItems="flex-start" onClick={() => handleSelectedChallenge(challenge)}>
                        <ListItemAvatar>
                            <Avatar alt={challenge?.user?.username} sx={{ bgcolor: deepOrange[500] }} src={challenge.user.userImage} />
                        </ListItemAvatar>
                        <ListItemText primary={<div className='d-flex justify-content-between'><h5 className='m-0'>{challenge?.user?.username}</h5><span className='fs-14 text-secondary'>{timeSlince(challenge?.createdAt)}</span></div>} secondary={<span className='text-light-secondary'>{challenge.title}</span>} />
                    </ListItemButton>
                ))}
            </List>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'sticky', top: 0, zIndex: 1100 }} className='bg-dark-gray'>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            <Link to={"/"} className='text-light text-decoration-none fw-semibold fs-4' >LOGICHELP</Link>
                        </Typography>
                        <div className='fs-5'>
                            Live Challenge <LocalFireDepartmentOutlinedIcon className='fire-icon' />
                        </div>
                    </Toolbar>
                </AppBar>

                <div className='near-black p-2 flex-1'>
                    {!selectedChallenge ?
                        <div className='py-4 text-center text-secondary'>
                            <h1 className='fw-semibold'>Pick a Live Challenge to Start</h1>
                        </div> :

                        <div>
                            <div className='col-12 col-md-11 mx-auto bg-dark-gray rounded p-2'>
                                <div className='d-flex flex-wrap align-items-center border-bottom pt-2 pb-3 border-secondary'>
                                    <Avatar sx={{ bgcolor: deepPurple[500], }} alt={selectedChallenge?.user?.username} src={selectedChallenge?.user?.image}></Avatar>
                                    <h4 className='m-0 ps-2 text-break fw-semibold text-light-secondary'>{selectedChallenge?.user?.username}</h4>
                                </div>

                                <h5 className='py-3 m-0'><span className='text-secondary pe-1'>Title:</span> {selectedChallenge?.title}</h5>
                                {selectedChallenge?.imageURL && <div className='col-12 rounded'><img src={selectedChallenge?.imageURL} className=' img-fluid rounded' /></div>}

                                <div className='py-2 fs-16 text-light-secondary'>
                                    <p className='m-0 fs-6 text-light'>Description: </p>

                                    <p className='pre-wrap-space' >
                                        {selectedChallenge.textMessage}
                                    </p>

                                </div>
                            </div>

                            <div className='col-12 col-md-11 mx-auto p-2 my-2 rounded bg-dark-gray'>
                                <h4 className='fw-semibold border-bottom py-2'>User Contributions <GroupIcon sx={{ color: '#FF5733' }} className='ms-1' /></h4>

                                <ul className='list-unstyled'>
                                    {
                                        ((selectedChallenge?.result || []).length === 0) 
                                        ? <div className='py-3 text-center'>
                                            <h4 className='m-0 text-dark'>No Solutions Shared Yet.</h4>
                                        </div>
                                        : selectedChallenge?.result.map((contributor, index) =>
                                            <li key={index} className='pt-3 px-2 border-bottom border-dark'>
                                                <div className='d-flex align-items-center justify-content-between'>
                                                    <div className='d-flex align-items-center'>
                                                        <Avatar alt={contributor?.user?.username} sx={{ bgcolor: deepPurple[300] }} src={contributor?.user?.image} />
                                                        <h5 className='fw-semibold ps-3 m-0 text-break'>{contributor?.user?.username}</h5>
                                                    </div>
                                                    <span className='fs-14 text-secondary'>{timeSlince(contributor?.createdAt)}</span>
                                                </div>
                                                <div className='fs-16 text-light-secondary ps-5 pb-2'>
                                                    <p className='pre-wrap-space border rounded-bottom rounded-end border-secondary m-0 p-1 bg-dark w-fit-content'>
                                                        {contributor.message}
                                                    </p>
                                                    {contributor?.deployLink && <a href={contributor?.deployLink} className='text-decoration-none p-1'>click here</a>}
                                                </div>

                                            </li>
                                        )
                                    }
                                </ul>

                                <textarea value={challengeSolution} onChange={(e) => setChallengeSolution(e.target.value)} className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 text-light rounded-0" placeholder="Type your response to the challenge..."></textarea>

                                <p className='m-0 mt-1 fs-14 text-warning border w-fit-content border-bottom-0 border-secondary py-1 px-2'>Optional</p>
                                <input type="text" value={projectDeployLink} onChange={(e) => setProjectDeployLink(e.target.value)} className='text-light col-12 bg-transparent border border-secondary p-1 fs-16' placeholder='Enter deployment link' />

                                <div className='mt-1 d-flex justify-content-end'>
                                    <button className="input-group-text p-0 bg-transparent border-secondary rounded-0" onClick={handleSendEvent} >
                                        <span className='text-secondary fs-16 ps-2'>Send</span>
                                        <SendIcon className='fs-6 text-light m-2' />
                                    </button>
                                </div>

                            </div>
                        </div>

                    }

                </div>

            </Dialog>
            <ToastContainer theme="colored" position="bottom-right" />
        </div>
    )
}