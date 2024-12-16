import React, { useState } from 'react';
import "./SharedComponent.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';

export default function Footer({ loginUser }) {

    const [open, setOpen] = React.useState(false);
    const [feedback, setFeedback] = useState({ reviewMessage: "", rating: 3, working: "" });
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setError("");
        const { name, value } = e.target;
        setFeedback({
            ...feedback,
            [name]: value,
        });
    }

    const handleClose = () => {
        setFeedback({ reviewMessage: "", rating: 3, working: "" });
        setOpen(false);
    }

    const handleFeedbackSubmit = async () => {
        const { reviewMessage, rating, working } = feedback;

        // Basic validation
        if (!reviewMessage || !working || rating <= 0) {
            setError("All fields are required.");
            return;
        }
        if (reviewMessage.length > 250 || working.length > 50) {
            setError("Your message or profession is too long.");
            return;
        }
        if (!loginUser) {
            setError("You must log in to review the application.");
            return;
        }

        try {
            setIsLoading(true);
            const { data } = await axios.post(`https://loginhelp.onrender.com/user/feedback/${loginUser?._id}`, {
                reviewMessage,
                rating,
                working
            });

            if (!data.success) {
                setError(data?.message);
            } else {
                handleClose()
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    if (open) {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='feedback-component'
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    Give us your valuable feedback
                </DialogTitle>
                {isLoading && <LinearProgress />}
                <DialogContent className='pb-0 border-top pt-2'>
                    {error && <p className='m-0 text-danger'>{error}</p>}
                    <TextField
                        id="outlined-multiline-flexible"
                        name='reviewMessage'
                        value={feedback.reviewMessage}
                        onChange={handleInputChange}
                        label="Review Message"
                        className='mt-2'
                        size='small'
                        multiline
                        fullWidth
                        maxRows={3}
                    />

                    <div>
                        <TextField
                            id="outlined-multiline-flexible"
                            name="working"
                            value={feedback.working}
                            onChange={handleInputChange}
                            label="Profession (e.g., Student, Software Engineer...)"
                            className="mt-2"
                            size="small"
                            multiline
                            fullWidth
                            maxRows={3}
                        />
                    </div>

                    <div className='m-0 ps-1 fs-16 d-flex align-items-center pt-2'>
                        <Rating name="rating" onChange={handleInputChange} defaultValue={3} />
                        <p className='m-0 ps-3'>Rating</p>
                        <span className='fs-6 ps-1'>{feedback.rating}</span>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleFeedbackSubmit} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <footer className='mb-0 dashboard-footer'>
            <div className='col-md-10 mx-auto d-flex flex-wrap justify-content-between p-2'>
                <p className='mb-0 py-3'>&copy; 2024 LogicHelp. All rights reserved.</p>

                <div className='d-flex'>
                    <ul className='d-flex list-unstyled align-items-center mb-0 fs-16'>
                        <li className='px-1'><a href="/about" className='footer-link'>About Us</a></li>
                        <li className='px-1'><a href="/privacy" className='footer-link'>Privacy Policy</a></li>
                        <li className='px-1'><a href="/terms" className='footer-link'>Terms of Service</a></li>

                        <li className='ps-1'><a href='https://linkedin.com/in/nitin-gayke92' ><LinkedInIcon className='fs-6' /> </a></li>
                        <li className='ps-1'><a href='https://github.com/nitingayke' ><GitHubIcon className='fs-6' /> </a></li>
                        <li className='ps-1'><a href='/telegram' ><TelegramIcon className='fs-6' /> </a></li>

                        <li className='ps-1'>
                            <button onClick={() => setOpen(true)} className='bg-transparent border-0 text-orange'> <TextsmsOutlinedIcon className='fs-6' />Feedback</button>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}