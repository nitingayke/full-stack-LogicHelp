import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { toast, ToastContainer } from 'react-toastify';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function CreateNewChallenge() {
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
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleTagButton = (currTag) => {
        setTag(currTag);
        handleClose();
    }

    const handleFileChange = () => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImageUrl(URL.createObjectURL(file));  // Create an object URL for the image
        }
    }

    const handleDoubleEvent = () => {
        if (!title || !textMessage) {
            toast.error("Title and message are required.");
            return;
        }
        toast.success("Your doubt has been successfully submitted!");
    }

    return (
        <div className='mb-2 col-12'>

            <div className='bg-dark-gray p-3 multi-color-border rounded'>
                <h4 className='fw-semibold fs-3 m-0 pb-2'>Create New Challenge <AddTaskIcon className='fs-3 color-green' /></h4>

                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='col-12 bg-transparent border-0 border-primary text-light p-1 fs-5' />
                <textarea name="text-message" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} placeholder='Text Message...' className='col-12 p-2 bg-transparent text-light fs-16 border-0 mb-1 doubts-text-message'></textarea>
                <p className='m-0 fs-14 text-warning'>Optional</p>

                <div className='col-12 d-flex flex-wrap justify-content-between'>
                    <div className='pb-2'>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Select Image
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileChange}
                            />
                        </Button>

                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className='bg-dark text-light mx-2'
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
                            <MenuItem onClick={() => handleTagButton("Web Development")}>Programming Languages</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Creative")}>Frontend</MenuItem>
                            <MenuItem onClick={() => handleTagButton("AI")}>AI</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Machine Learning")}>Machine Learning</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Cybersecurity")}>Cybersecurity</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Databases")}>Databases</MenuItem>
                            <MenuItem onClick={() => handleTagButton("Others")}>Others</MenuItem>
                        </Menu>
                    </div>

                    <Button variant="contained" color="secondary" startIcon={<ChatBubbleOutlineIcon />} onClick={handleDoubleEvent}>
                        Post a Challenge
                    </Button>

                </div>
            </div>

            <ToastContainer position='bottom-right' theme='colored' />
        </div>
    )
}