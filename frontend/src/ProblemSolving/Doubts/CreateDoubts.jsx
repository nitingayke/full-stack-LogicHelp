import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { toast, ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
const socket = io('https://loginhelp-backend.onrender.com');

export default function CreateDoubts({ loginUser }) {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [title, setTitle] = useState("");
    const [textMessage, setTextMessage] = useState("");
    const [tag, setTag] = useState("DSA");

    const handleTagButton = (currTag) => {
        setTag(currTag);
        handleClose();
    }

    const handleDoubleEvent = async () => {

        if (!loginUser || typeof loginUser._id === 'undefined' || !loginUser._id) {
            toast.error('You need to login to create new doubt.');
            navigate('/login');
            return;
        }
        
        if (!title || !textMessage || !tag) {
            toast.error("Title, message, and tag are required.");
            return;
        }

        socket.emit('create-new-doubt', {
            user_id: loginUser?._id,
            title,
            message: textMessage,
            tag,
        });
        
        setTitle('');
        setTextMessage('');
    }

    return (
        <div className='mb-2 col-12'>

            <div className='bg-dark-gray p-3 multi-color-border rounded'>
                <h4 className='fw-semibold fs-3 m-0 pb-2'>Create New Doubts <LiveHelpOutlinedIcon className='fs-3 color-green' /></h4>

                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='col-12 bg-transparent border-0 border-primary text-light p-1 fs-5' />
                <textarea name="text-message" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} placeholder='Text Message...' className='col-12 p-1 bg-transparent text-light fs-16 border-0 mb-1 doubts-text-message'></textarea>

                <div className='col-12 d-flex justify-content-between'>
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
                            <MenuItem onClick={() => handleTagButton("Frontend")}>Web Development</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Deployment")}>Deployment</MenuItem>
                            <MenuItem onClick={() => handleTagButton("AI")}>AI</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Machine Learning")}>Machine Learning</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Cybersecurity")}>Cybersecurity</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Operating Systems")}>Operating Systems</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Computer Networks")}>Computer Networks</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Databases")}>Databases</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Version Control(Git)")}>Version Control(Git)</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Others")}>Others</MenuItem>
                        </Menu>
                    </div>

                    <Button variant="contained" color="secondary" startIcon={<QuestionAnswerIcon />} onClick={handleDoubleEvent}>
                        Post a Doubt
                    </Button>

                </div>
            </div>

            <ToastContainer position='bottom-right' theme='colored' />
        </div>
    )
}