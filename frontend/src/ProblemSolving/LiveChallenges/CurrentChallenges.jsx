import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { timeSlince } from '../../functions';
import Button from '@mui/material/Button';
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function CurrentChallenges({ challenges = [] }) {

    const [open, setOpen] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [challengeSolution, setChallengeSolution] = useState("");

    const handleSelectedChallenge = (challenge) => {
        setSelectedChallenge(challenge);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSendEvent = () => {
        // we have to creaete backend api that will add new solution on to the mongo db
        if(!challengeSolution){
            toast.error("Please enter your solution before submitting.");
            return ;
        }
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
                                    <Avatar sx={{ bgcolor: deepPurple[500], }} alt={selectedChallenge.user.username} src={selectedChallenge.user.userImage}></Avatar>
                                    <h4 className='m-0 ps-2 text-break fw-semibold text-light-secondary'>{selectedChallenge.user.username}</h4>
                                </div>

                                <h5 className='py-3 m-0'><span className='text-secondary pe-1'>Title:</span> {selectedChallenge?.title}</h5>
                                {selectedChallenge.image && <div className='col-12 rounded'><img src={selectedChallenge.image} className=' img-fluid rounded' /></div>}

                                <div className='py-2 fs-16 text-light-secondary'>
                                    <p className='m-0 fs-6 text-light'>Description: </p>
                                    {selectedChallenge?.textMessage.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            <div className='col-12 col-md-11 mx-auto p-2 my-2 rounded bg-dark-gray'>
                                <h4 className='fw-semibold border-bottom py-2'>User Contributions <GroupIcon sx={{ color: '#FF5733' }} className='ms-1' /></h4>

                                <ul className='list-unstyled'>
                                    {selectedChallenge?.result.map((contributor, index) =>
                                        <li key={index} className='pt-3 px-2'>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <div className='d-flex align-items-center'>
                                                    <Avatar alt={contributor?.username} sx={{ bgcolor: deepPurple[300] }} src={contributor?.image} />
                                                    <h5 className='fw-semibold ps-3 m-0 text-break'>{contributor?.username}</h5>
                                                </div>
                                                <span className='fs-16 text-secondary'>{timeSlince(contributor?.createdAt)}</span>
                                            </div>
                                            <div className='fs-16 text-light-secondary ps-5 py-2'>
                                                {contributor?.message.split('\n').map((line, index) => (
                                                    <React.Fragment key={index}>
                                                        {line}
                                                        <br />
                                                    </React.Fragment>
                                                ))}
                                                {contributor?.deployLink && <a href={contributor.deployLink} className='text-decoration-none'>click here</a>}
                                            </div>

                                        </li>
                                    )}
                                </ul>

                                <div>
                                    <div className="input-group pt-3">
                                        <textarea value={challengeSolution} onChange={(e) => setChallengeSolution(e.target.value)} className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 text-light rounded-0" placeholder="Type your response to the challenge..."></textarea>
                                        <button className="input-group-text p-0 bg-transparent border-secondary border-start-0 rounded-0" onClick={handleSendEvent} ><SendIcon className='fs-6 text-light m-2' /></button>
                                    </div>
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