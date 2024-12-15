import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import RadarIcon from '@mui/icons-material/Radar';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ShareIcon from '@mui/icons-material/Share';
import { timeSlince } from '../../functions';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Link } from 'react-router-dom';

export default function ProblemDescription({ problem, loginUser }) {
    const [localProblem, setLocalProblem] = useState(problem);
    const [isLoading, setIsLoading] = useState(false);
    const [commentText, setCommentText] = useState();

    const handleLikeButton = async () => {

        if(!loginUser?._id){
            toast.error("You need to login to like question.");
            return ;
        }

        if(!problem?._id){
            toast.error("Problem not found.");
            return ;
        }

        try {
            setIsLoading(true);
            const res = await axios.put(`https://loginhelp-backend.onrender.com/questions/question-like/${problem?._id}/user/${loginUser?._id}`);

            if (res.status === 200) {
                setLocalProblem((prev) =>  ({
                    ...prev,
                    likes: [...prev.likes, loginUser?._id],
                }));
            } else {
                toast.error("Something went wrong. Please try again later.");
            }
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error("Question or user not found. Please check the data.");
            } else if (error.response?.status === 400) {
                toast.error("Bad request. Please ensure your data is correct.");
            } else {
                toast.error("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleCommentSubmit = async () => {

        if (!commentText) {
            toast.error("comments are required..");
            return;
        }

        if(!loginUser?._id){
            toast.error("You need to login to add comment.");
            return ;
        }

        try {

            const res = await axios.put(`https://loginhelp-backend.onrender.com/questions/comment/${problem?._id}/user/${loginUser?._id}`, {
                comment: commentText,
            });

            if (res.status === 200) {
                const newComment = {
                    content: commentText,
                    createdAt: new Date(),
                    user: {
                        country: loginUser.country,
                        username: loginUser.username,
                        _id: loginUser?._id,
                    }
                }
                setLocalProblem((prev) => ({
                    ...prev,
                    comments: [...prev.comments, newComment],
                }));

            } else {
                toast.error("Something went wrong. Please try again later");
            }
        } catch (error) {
            toast.error("unable to comment on this question.");
        }
        setCommentText("");
    }

    const handleSupportButton = async (comment_id) => {

        if(!loginUser?._id){
            toast.error("You need to login.");
            return ;
        }

        try {
            const res = await axios.put(`https://loginhelp-backend.onrender.com/questions/comment/support-point/${comment_id}/user/${loginUser?._id}`);

            if (res.status === 200) {

                setLocalProblem((prev) => {
                    const updatedComments = prev.comments.map((comment) =>
                        comment?._id === comment_id
                            ? {
                                ...comment,
                                supportPoints: [...comment.supportPoints, loginUser?._id],
                            }
                            : comment
                    );

                    return {
                        ...prev,
                        comments: updatedComments,
                    };
                });

            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("unable to add support point.");
        }
    }


    const deleteUserComment = async (comment_id) => {

        try {
            const res = await axios.delete(`https://loginhelp-backend.onrender.com/questions/${problem?._id}/delete-comment/${comment_id}/user/${loginUser?._id}`);

            if (res.status == 200) {
                const commentFilter = localProblem.comments.filter((c) => c?._id !== comment_id);
                setLocalProblem((prev) => ({
                    ...prev,
                    comments: commentFilter,
                }));
            } else {
                toast.error("Something went wrong. Please try again later");
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again later.");
        }
    }

    const addFavoriteQuestion = async() => {
   
        try {
            const res = await axios.put(`https://loginhelp-backend.onrender.com/questions/add-favorite/${problem?._id}/user/${loginUser?._id}`);
            
            toast.success(res.data.message);
        } catch (error) {
            toast.error('unable to add question, Please try again later.')
        }
    }

    return (
        <>
            <div className='mb-3 pt-3'>
                <h4 className='fw-semibold'><span className='me-2'>{localProblem.questionNo}</span><span className='text-break'>{localProblem.title}</span></h4>
            </div>
            <ul className='list-unstyled d-flex align-items-center fs-16'>
                <li>
                    {localProblem.category === 'easy' && <span className='text-aqua color-aqua rounded py-1 px-2 bg-light-aqua'>Easy</span>}
                    {localProblem.category === 'medium' && <span className='text-gold color-aqua rounded py-1 px-2 bg-light-gold'>Medium</span>}
                    {localProblem.category === 'hard' && <span className='text-red rounded py-1 px-2 bg-light-red'>Hard</span>}
                </li>
                <li className='ps-2'>
                    {
                        (localProblem && !localProblem.likes.includes(loginUser?._id.toString())) ? (
                            <button onClick={handleLikeButton} type='button' className='d-flex align-items-center px-2 fs-16 bg-dark border border-secondary rounded text-light'>
                                {isLoading ? (
                                    <div className="spinner-border text-orange spinner-border-sm my-1"></div>
                                ) : (
                                    localProblem.likes.length
                                )}
                                <ThumbUpOutlinedIcon className='ms-1 fs-16' />
                            </button>
                        ) : (
                            <span className='d-flex align-items-center px-2 fs-16 bg-dark border border-warning rounded text-light'>
                                {localProblem.likes.length}
                                <ThumbUpIcon className='ms-1 fs-16 text-orange' />
                            </span>
                        )
                    }

                </li>
                <li>
                    <button onClick={addFavoriteQuestion} className='ms-2 py-1 fs-14 border-0 bg-dark text-light px-2 rounded hover-orange'>Favorite</button>
                </li>
            </ul>
            <ul className='mb-5 list-unstyled'>
                {localProblem.description.map((description, idx) => <li key={idx}><p className='fs-16'>{description}</p></li>)}
                <li>{localProblem.image && <img src={localProblem.image} alt="" className='py-3 img-fluid' />}</li>
            </ul>
            <div>
                {localProblem.examples.map((example, idx) =>
                    <div key={idx} className='mb-4'>
                        <h6 className='mb-2'>Examples: {idx + 1}</h6>
                        <div className='fs-16'>
                            {example.image && <img src={example.image} alt="" className='py-3 img-fluid' />}
                            <p className='m-1'>Input: {example.input}</p>
                            <p className='m-1'>Output: {example.output}</p>
                            <p className='m-1 text-light-secondary'>Description: {example.description}</p>
                        </div>
                    </div>
                )}
            </div>
            {localProblem.followUp && <div className='py-3'>
                <h6 className='fs-16 fw-bold'>Follow Up:</h6>
                {localProblem.followUp.map((followUp, idx) => <p key={idx} className='fs-16 ps-2 mb-2'>{followUp}</p>)}
            </div>}
            <div className='py-3'>
                <h6>Constraints:</h6>
                {localProblem.constraints.map((constraint, idx) => <p key={idx} className='fs-16 border-0 w-fit-content px-2 rounded bg-dark mb-1 text-light-secondary'>{constraint}</p>)}
            </div>

            <ul className='list-unstyled fs-14 d-flex flex-wrap text-light-secondary border-bottom border-top border-secondary py-2'>
                <li>
                    <p className='mb-0 border-end border-secondary pe-2'>Accepted: {localProblem.accepted.length}</p>
                </li>
                <li>
                    <p className='mb-0 border-end border-secondary px-2'>Submissions: ?</p>
                </li>
                <li>
                    <p className='mb-0 px-2'>Acceptance: ?</p>
                </li>
            </ul>

            {localProblem.topics && <Accordion sx={{ boxShadow: 'none' }} className='bg-transparent text-light border-bottom border-secondary rounded-0'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className='text-light' />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='px-0  fs-16'
                >
                    <div className='d-flex align-items-center'>
                        <LocalOfferOutlinedIcon className='fs-6 me-2' /> Topics
                    </div>
                </AccordionSummary>
                <AccordionDetails className='pe-0 fs-16 d-flex flex-wrap'>
                    {localProblem.topics.map((topic, idx) => <span className='py-1 px-2 rounded m-1 mb-2 bg-dark' key={idx}>{topic}</span>)}
                </AccordionDetails>
            </Accordion>}

            {localProblem.company && <Accordion sx={{ boxShadow: 'none' }} className='bg-transparent text-light border-bottom border-secondary rounded-0'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className='text-light' />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='px-0 fs-16'
                >
                    <div className='d-flex align-items-center'>
                        <RadarIcon className='fs-6 me-2' />Company
                    </div>
                </AccordionSummary>
                <AccordionDetails className='pe-0 fs-16 d-flex flex-wrap'>
                    {localProblem.company.map((company, idx) => <p className='py-1 px-2 rounded m-1 mb-2 bg-dark' key={idx}>{company}</p>)}
                </AccordionDetails>
            </Accordion>}

            {localProblem?.hint.length > 0 && <Accordion sx={{ boxShadow: 'none' }} className='bg-transparent text-light border-bottom border-secondary rounded-0'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className='text-light' />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='px-0 fs-16'
                >
                    <div className='d-flex align-items-center'>
                        <TipsAndUpdatesOutlinedIcon className='fs-6 me-2' />Hint
                    </div>
                </AccordionSummary>
                <AccordionDetails className='pe-0 fs-16'>
                    {localProblem.hint.map((hint, idx) => <p className='m-0' key={idx}>{hint}</p>)}
                </AccordionDetails>
            </Accordion>}

            <Accordion sx={{ boxShadow: 'none' }} className='bg-transparent text-light border-bottom border-secondary rounded-0'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className='text-light' />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='px-0 fs-16'
                >
                    <div className='d-flex align-items-center'>
                        <ChatBubbleOutlineOutlinedIcon className='fs-6 me-2' />Comments <span className='fs-14 ps-2'>{(localProblem?.comments || []).length}</span>
                    </div>
                </AccordionSummary>
                <AccordionDetails className='px-0 fs-16'>

                    <div className='col-12 p-2 question-discussion-box mb-3 border-bottom border-secondary'>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            name="usercomment" className='col-12 bg-transparent text-light p-1 border-0'
                            rows={5}
                            placeholder='Share your thoughts or doubts...'></textarea>

                        <div className='col-12 d-flex justify-content-end'>
                            <button onClick={handleCommentSubmit} type="button" className="btn btn-outline-success">Comment</button>
                        </div>
                    </div>

                    {localProblem?.comments?.map((comment, idx) =>
                        <div key={idx} className='px-2 pb-3 question-discussion-box mb-2'>

                            <div className='d-flex flex-wrap align-items-center py-2 col-12'>
                                <Avatar sx={{ bgcolor: deepOrange[500] }} alt={comment?.user?.username} src={comment?.user?.image}></Avatar>
                                <Link to={`/user-profile/${comment?.user?._id}`} className='m-0 fs-5 ps-2 fw-semibold hover-orange cursor-pointer text-decoration-none text-light'>{comment?.user?.username}</Link>
                                <i className='m-0 fs-14 ps-2 text-secondary'>{comment?.user?.country}</i>

                                <p className='m-0 ms-auto fs-14 opacity-25'>{timeSlince(comment?.createdAt)}</p>
                            </div>

                            <p className='m-0 text-light-secondary' style={{ whiteSpace: 'pre-wrap' }}>{comment?.content}</p>

                            <ul className='list-unstyled m-0 pt-3 text-secondary d-flex align-items-center'>
                                <li className='px-1 d-flex align-items-center pe-3'>
                                    {
                                        (comment?.supportPoints?.includes(loginUser?._id) || comment.user?._id === loginUser?._id)
                                            ? <ArrowCircleUpIcon className='fs-5 text-secondary color-orange me-1' />
                                            : <button type='button' onClick={() => handleSupportButton(comment?._id)} className='bg-transparent border-0 me-1 pb-1'>
                                                <ArrowCircleUpIcon className='fs-5 text-secondary hover-orange' />
                                            </button>

                                    }
                                
                                    <span >{comment?.supportPoints?.length || 0}</span>
                                </li>

                                <li className='px-1'>
                                    <button className='bg-transparent border-0 me-1 text-light-secondary fs-14 d-flex align-items-center hover-orange'><ShareIcon className='fs-6 me-1' />Share</button>
                                </li>
                                {
                                    comment.user?._id === loginUser?._id && <li className='px-1'>
                                        <button onClick={() => deleteUserComment(comment?._id)} className='bg-transparent border-0 me-1 text-light-secondary fs-14 d-flex align-items-center hover-orange'><DeleteOutlinedIcon className='fs-6 me-1' />delete</button>
                                    </li>
                                }
                            </ul>
                        </div>)}
                </AccordionDetails>
            </Accordion>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="colored"
            />
        </>
    )
}

