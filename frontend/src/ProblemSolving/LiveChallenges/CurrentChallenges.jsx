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
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';

import { io } from 'socket.io-client';
const socket = io('https://loginhelp-backend.onrender.com');

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function CurrentChallenges({ challenges, loginUser }) {

    const [open, setOpen] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [challengeSolution, setChallengeSolution] = useState("");
    const [projectDeployLink, setProjectDeployLink] = useState("");
    const [isEditOn, setIsEditOn] = useState(false);
    const [editInputValues, setEditInputValues] = useState({
        title: "",
        textMessage: "",
        imageURL: ""
    });

    useEffect(() => {
        setEditInputValues({
            title: selectedChallenge?.title || "",
            textMessage: selectedChallenge?.textMessage || "",
            imageURL: selectedChallenge?.imageURL || "",
        });
    }, [selectedChallenge]);

    useEffect(() => {
        socket.on('live-challenge-results-success', (data) => {
            setSelectedChallenge((prev) => ({
                ...prev,
                result: [...prev.result, data.result],
            }));
        });

        socket.on('edited-live-challenge', (data) => {
            const { challenge_id, title, textMessage, imageURL } = data;

            if (selectedChallenge?._id === challenge_id) {
                setSelectedChallenge((prev) => ({
                    ...prev,
                    title,
                    textMessage,
                    imageURL
                }));
            }
        });

        socket.on('deleted-selected-challenge-comment', ({ challenge_id, comment_id }) => {

            if (selectedChallenge?._id === challenge_id) {
                setSelectedChallenge((prev) => ({
                    ...prev,
                    result: prev.result.filter((comment) => comment._id !== comment_id)
                }));
            }
        });

        return () => {
            socket.off('live-challenge-results-success');
            socket.off('edited-live-challenge');
            socket.off('deleted-selected-challenge-comment');
        }

    }, [loginUser]);

    const handleChallengeInputValue = (e) => {
        const { name, value } = e.target;
        setEditInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }
    
    const handleSelectedChallenge = (challenge) => {
        setSelectedChallenge(challenge);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSendEvent = () => {

        if(!loginUser || typeof loginUser._id === 'undefined' || !loginUser._id) {
            toast.error('You need to login to submit your solution.');
            return;
        }

        if(!challengeSolution) {
            toast.error("Please enter your solution before submitting.");
            return;
        }

        socket.emit('live-challenge-results', {
            user_id: loginUser?._id,
            challenge_id: selectedChallenge._id,
            challengeSolution,
            projectDeployLink,
        });
        setChallengeSolution("");
        setProjectDeployLink("");
    }

    const handleEditChallenge = () => {

        setIsEditOn(false);
        socket.emit('edit-live-challenge', {
            challenge_id: selectedChallenge?._id,
            title: editInputValues?.title,
            textMessage: editInputValues?.textMessage,
            imageURL: editInputValues?.imageURL,
        });
    }

    const deleteSelectedChallenge = () => {

        if (!selectedChallenge) {
            toast.error('selected challenge does not found!');
            return;
        }

        setSelectedChallenge(null);
        socket.emit('delete-selected-challenge', {
            challenge_id: selectedChallenge._id,
        });
    }

    const deleteSelectedChallengeComment = (comment_id) => {

        if (!comment_id || !selectedChallenge) {
            toast.error('comment and challenge not found');
            return;
        }

        socket.emit('delete-selected-challenge-comment', {
            challenge_id: selectedChallenge?._id,
            comment_id,
        });
    }

    const isImageLink = (url) => {
        return /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(url);
    };

    return (
        <div>

            <List>
                {challenges?.map((challenge, index) => (
                    <ListItemButton key={index} alignItems="flex-start" onClick={() => handleSelectedChallenge(challenge)}>
                        <ListItemAvatar>
                            <Avatar alt={challenge?.user?.username} sx={{ bgcolor: deepOrange[500] }} src={challenge?.user?.image} />
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
                                    <Link className='text-decoration-none text-secondary fw-semibold hover-orange text-break fs-4 ps-3' to={`/user-profile/${selectedChallenge?.user?._id}`} >{selectedChallenge?.user?.username}</Link>

                                    <span className='fs-16 text-secondary ms-auto'>{timeSlince(selectedChallenge?.createdAt)} ago</span>
                                </div>

                                {
                                    (isEditOn)
                                        ? <div className=' my-2 d-flex align-items-center'>
                                            <span className='text-secondary pe-2'>Title:</span>
                                            <input
                                                value={editInputValues.title}
                                                name='title'
                                                onChange={handleChallengeInputValue}
                                                className='text-light flex-1 bg-transparent border border-secondary p-1 fs-16'
                                            />
                                        </div>
                                        : <h5 className='py-3 m-0'><span className='text-secondary pe-1'>Title:</span> {selectedChallenge?.title}</h5>
                                }
                                {
                                    (selectedChallenge?.imageURL)
                                    && (
                                        (isEditOn)
                                            ? <div className=' my-2 d-flex align-items-center'>
                                                <span className='text-secondary pe-2'>ImageUrl:</span>
                                                <input
                                                    value={editInputValues.imageURL}
                                                    name='imageURL'
                                                    onChange={handleChallengeInputValue}
                                                    className='text-light flex-1 bg-transparent border border-secondary p-1 fs-16'
                                                />
                                            </div>
                                            : <div className='col-12 rounded'>
                                                <img src={selectedChallenge?.imageURL} className=' img-fluid rounded' />
                                            </div>
                                    )
                                }

                                <div className='py-2 fs-16 text-light-secondary'>
                                    <p className='m-0 fs-6 text-secondary'>Description: </p>

                                    {
                                        (isEditOn)
                                            ? <textarea
                                                value={editInputValues.textMessage}
                                                onChange={handleChallengeInputValue}
                                                name='textMessage'
                                                className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 text-light rounded-0"
                                                placeholder="Type your response to the challenge..."
                                                rows={5}></textarea>
                                            : <p className='pre-wrap-space' >
                                                {selectedChallenge.textMessage}
                                            </p>
                                    }

                                </div>

                                {
                                    (loginUser?._id === selectedChallenge?.user?._id)
                                    && <div className='col-12 d-flex justify-content-end'>
                                        {
                                            (new Date(selectedChallenge.updatedAt) > new Date(selectedChallenge.createdAt))
                                            && <p className="text-danger m-0 flex-1 fs-14 opacity-75">This challenge has been updated at {(selectedChallenge?.updatedAt || "").substring(0, 10)}.</p>
                                        }
                                        {
                                            (isEditOn)
                                                ? <>
                                                    <button
                                                        type='button'
                                                        onClick={() => setIsEditOn(false)}
                                                        className='fs-14 px-2 bg-transparent text-info border border-info hover-orange me-1'>Cancel
                                                    </button>
                                                    <button
                                                        type='button'
                                                        onClick={handleEditChallenge}
                                                        className='fs-14 px-2 bg-transparent text-info border border-info hover-orange'>Save
                                                    </button>
                                                </>
                                                : <Tooltip title='Do you want to EDIT challenge.'>
                                                    <button
                                                        type='button'
                                                        onClick={() => setIsEditOn(true)}
                                                        className='fs-14 px-2 bg-transparent border-0 text-secondary hover-orange'>Edit
                                                    </button>
                                                </Tooltip>
                                        }
                                        <Tooltip title='Do you want to Delete challenge.'>
                                            <button
                                                type='button'
                                                onClick={deleteSelectedChallenge}
                                                className='fs-14 px-2 bg-transparent border-0 text-secondary hover-orange'>Delete</button>
                                        </Tooltip>
                                    </div>
                                }

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
                                                    <div className='d-flex align-items-center justify-content-between pb-2'>
                                                        <div className='d-flex align-items-center'>
                                                            <Avatar alt={contributor?.user?.username} sx={{ bgcolor: deepPurple[300] }} src={contributor?.user?.image} />

                                                            <Link className='text-decoration-none text-light hover-orange text-break fs-4 ps-3' to={`/user-profile/${contributor?.user?._id}`} >{contributor?.user?.username}</Link>
                                                        </div>
                                                        <span className='fs-14 text-secondary'>{timeSlince(contributor?.createdAt)}</span>
                                                    </div>
                                                    <div className='fs-16 text-light-secondary ps-5 pb-2'>
                                                        <p className='pre-wrap-space border rounded-bottom rounded-end border-secondary m-0 p-1 bg-dark w-fit-content mb-1'>
                                                            {contributor.message}
                                                        </p>
                                                        {
                                                            contributor?.deployLink
                                                            && (
                                                                (isImageLink(contributor?.deployLink))
                                                                    ? <div className='py-2'>
                                                                        <img src={contributor?.deployLink} className='img-fluid col-md-5 rounded' alt='' />
                                                                    </div>
                                                                    : <a href={contributor?.deployLink} className='text-decoration-none' target="_blank" rel="noopener noreferrer">click here</a>
                                                            )
                                                        }
                                                    </div>

                                                    {
                                                        (contributor?.user?._id === loginUser?._id)
                                                        && <div className='col-12 d-flex justify-content-end'>
                                                            <Tooltip title='Do you want to delete comment.'>
                                                                <button onClick={() => deleteSelectedChallengeComment(contributor?._id)} className='border-0 bg-transparent text-secondary fs-16 hover-orange'>Delete</button>
                                                            </Tooltip>
                                                        </div>
                                                    }
                                                </li>
                                            )
                                    }
                                </ul>

                                <textarea value={challengeSolution} onChange={(e) => setChallengeSolution(e.target.value)} className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 text-light rounded-0" placeholder="Type your response to the challenge..."></textarea>

                                <p className='m-0 mt-1 fs-14 text-warning border w-fit-content border-bottom-0 border-secondary py-1 px-2'>Optional</p>
                                <input type="text" value={projectDeployLink} onChange={(e) => setProjectDeployLink(e.target.value)} className='text-light col-12 bg-transparent border border-secondary p-1 fs-16' placeholder='Enter deployment link' />

                                <div className='mt-1 d-flex justify-content-end'>
                                    {
                                        ((challengeSolution || "").length > 0)
                                            ? <button className="input-group-text p-0 bg-transparent border-orange rounded-0" onClick={handleSendEvent} >
                                                <span className='text-orange fs-16 ps-2'>Send</span>
                                                <SendIcon className='fs-6 text-orange m-2' />
                                            </button>
                                            : <button className="input-group-text p-0 bg-transparent border-secondary rounded-0">
                                                <span className='text-secondary fs-16 ps-2'>Send</span>
                                                <SendIcon className='fs-6 text-secondary m-2' />
                                            </button>
                                    }
                                </div>

                            </div>
                        </div>
                    }

                </div>

            </Dialog>
        </div>
    )
}