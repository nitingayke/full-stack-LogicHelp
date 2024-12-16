import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { toast } from 'react-toastify';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { io } from "socket.io-client";
const socket = io("https://logichelp-backend.onrender.com");

export default function CreateNewChallenge({ loginUser }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [title, setTitle] = useState();
    const [textMessage, setTextMessage] = useState();
    const [tag, setTag] = useState("DSA");
    const [imageURL, setImageURL] = useState("");

    const handleTagButton = (currTag) => {
        setTag(currTag);
        handleClose();
    }

    const submitNewChallenge = () => {

        if (!loginUser || typeof loginUser._id === 'undefined' || !loginUser._id) {
            toast.error('You need to login to create new challenge.');
            navigate('/login');
            return;
        }

        if (!title || !textMessage) {
            toast.error("Title and message are required.");
            return;
        }

        socket.emit('create-new-live-challenge', {
            user_id: loginUser?._id,
            title,
            message: textMessage,
            imageURL,
            tag
        });
        setTitle("");
        setTextMessage("");
        setImageURL("");
    }

    return (
        <div className='mb-2 col-12'>

            <div className='bg-dark-gray multi-color-border rounded'>
                <h4 className='fw-semibold fs-3 m-0 pb-2'>Create New Challenge <AddTaskIcon className='fs-3 color-green' /></h4>

                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='col-12 bg-transparent border-0 border-primary text-light p-1 fs-5' />
                <textarea name="text-message" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} placeholder='Text Message...' className='col-12 p-1 bg-transparent text-light fs-16 border-0 mb-1 doubts-text-message'></textarea>

                <p className='m-0 fs-14 text-warning'>Optional</p>
                <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} className='col-12 bg-transparent border border-secondary text-light p-1 fs-16 mb-2' placeholder='Enter deployment link' />

                <div className='col-12 d-flex flex-wrap justify-content-between'>
                    <div>

                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className='bg-dark text-light'
                        >
                            <LocalOfferIcon className='me-2 fs-6' />{tag}
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => handleTagButton("DSA")}>DSA</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Programming Languages")}>Programming Languages</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Web Development")}>Web Development</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Creative")}>Creative</MenuItem>
                            <MenuItem onClick={() => handleTagButton("AI")}>AI</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Machine Learning")}>Machine Learning</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Cybersecurity")}>Cybersecurity</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Databases")}>Databases</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Others")}>Others</MenuItem>
                        </Menu>
                    </div>

                    <Button variant="contained" color="secondary" startIcon={<ChatBubbleOutlineIcon />} onClick={submitNewChallenge}>
                        Post a Challenge
                    </Button>

                </div>
            </div>
        </div>
    )
}