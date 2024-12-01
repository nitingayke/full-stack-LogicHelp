import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { timeSlince } from '../../functions';
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { toast, ToastContainer } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

import { io } from 'socket.io-client';
const socket = io('http://localhost:9658');

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SolveDoubtsBox({ doubts, loginUser }) {
    const [localDoubts, setLocalDoubts] = useState();
    const [inputValue, setInputValue] = useState('');
    const [editBoxopen, setEditBoxOpen] = useState(false);
    const [editCommentOpen, setEditCommentOpen] = useState(false);
    const [editDoubt, setEditDoubt] = useState({
        title: doubts?.title || '',
        message: doubts?.message || ''
    });
    const [commentValue, setCommentValue] = useState();
    const [editCommentId, setEditCommentId] = useState();

    useEffect(() => {
        if (doubts) {
            setEditDoubt({
                title: doubts.title || '',
                message: doubts.message || ''
            });
        }
    }, [doubts]);


    const handleInputValues = (e) => {
        const { name, value } = e.target;
        setEditDoubt((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        setLocalDoubts(doubts);
    }, [doubts]);

    useEffect(() => {
        const handleUpdateComments = (data) => {
            if (data) {
                setLocalDoubts((prevDoubts) => ({
                    ...prevDoubts,
                    comments: [...prevDoubts.comments, data.newComment],
                }));
            }
        };

        const handleDoubtSolved = (data) => {
            if (data.status) {
                setLocalDoubts((prevDoubt) => ({
                    ...prevDoubt,
                    isSolve: true,
                }));
                toast.success('Doubt has been solved!');
            }
        }

        socket.on('update-comments', handleUpdateComments);
        socket.on('doubt-solved', handleDoubtSolved);

        return () => {
            socket.off('update-comments', handleUpdateComments);
            socket.off('doubt-solved', handleDoubtSolved);
        };
    }, [doubts?._id]);

    const handleReplyEvent = async () => {
        if (!inputValue.trim()) {
            toast.error('Reply message is required.');
            return;
        }

        if (inputValue.trim() === '#solve') {
            socket.emit('solved-doubt', { doubt_id: doubts?._id });
            return;
        }

        socket.emit('new-comment', {
            doubt_id: localDoubts?._id,
            user_id: loginUser?._id,
            message: inputValue,
        });
        setInputValue("");
    };

    const handleDeleteDoubt = () => {
        socket.emit('delete-user-doubt', {
            doubt_id: doubts?._id,
        });
    }

    const handleEditDoubtButton = async () => {
        socket.emit('edit-user-doubt', {
            doubt_id: doubts._id,
            title: editDoubt.title,
            message: editDoubt.message
        });
        setEditBoxOpen(false);
    }

    const deleteDoubtComment = (comment_id) => {
        socket.emit('delete-doubt-comment', {
            comment_id,
            doubt_id: doubts?._id
        });
    }

    const handleEditCommentButton = (comment_id) => {
        setEditCommentId(comment_id);
        setEditCommentOpen(true)
    }
    const handleEditComment = () => {
        socket.emit('edit-doubt-comment', {
            doubt_id: doubts._id,
            comment_id: editCommentId,
            message: commentValue,

        });
        setEditCommentOpen(false);
    }

    return (
        <>
            <div className='bg-dark-gray p-2 rounded'>
                {!doubts ? (
                    <div className='py-3'>
                        <h4 className='fs-1 text-center text-light-secondary opacity-75'>No Doubts Selected</h4>
                        <p className='text-center text-secondary fs-16'>
                            Solve user doubts to earn coins! For every doubt you solve, you will receive <span className='fw-bold'>5 coins</span>. Accumulate coins to unlock special rewards and showcase your expertise!
                        </p>
                        <p className='text-center fs-16'>
                            After solving a doubt, please make sure the doubt is marked as closed. For solved doubts, enter <span className='text-orange'>#solve</span>
                        </p>
                    </div>
                ) : (
                    <div className='p-2'>
                        <div className='d-flex align-items-center justify-content-between col-12 pb-2'>
                            <div className='d-flex align-items-center'>
                                <Avatar sx={{ bgcolor: deepPurple[500] }} className='me-2' alt={(localDoubts?.user?.username || '').toUpperCase()} src={doubts?.user?.image || '#'} />
                                <h4 className='text-break m-0 fw-semibold'>{localDoubts?.user?.username}</h4>
                            </div>
                            <p className='text-light-secondary m-0 fs-16'>{timeSlince(localDoubts?.createdAt)} ago</p>
                        </div>
                        {localDoubts?.isSolve ? (
                            <span className='fs-16 text-danger'>Solved</span>
                        ) : (
                            <span className='fs-16 text-info'>Open</span>
                        )}

                        <h6 className='text-break pt-2 m-0 text-orange'>
                            <span className='text-secondary'>Tag:</span> {localDoubts?.tag}
                        </h6>
                        <h6 className='text-break pt-2'>
                            <span className='text-secondary'>Title:</span> {localDoubts?.title}
                        </h6>
                        <p className='m-0 fs-16 pre-wrap-space mb-2'>
                            <span className='text-secondary'>Message:</span>{localDoubts?.message}
                        </p>
                        {
                            (loginUser?._id == doubts?.user?._id) && <div className='d-flex justify-content-end'>
                                <Tooltip title='Do you want to EDIT this doubt.'>
                                    <button onClick={() => setEditBoxOpen(true)} className='px-2 fs-14 bg-transparent text-warning border-0 me-2'>Edit</button>
                                </Tooltip>

                                <Tooltip title='Do you want to delete this doubt.'>
                                    <button onClick={handleDeleteDoubt} className='px-2 fs-14 bg-transparent text-danger border-0'>Delete</button>
                                </Tooltip>
                            </div>
                        }
                        {
                            (new Date(doubts?.updatedAt) > new Date(doubts.createdAt)) && <p className='fs-14 m-0 text-secondary'>this doubt are updated on {(doubts?.updatedAt || "").substring(0, 10)}.</p>
                        }
                        <div className='fs-14 col-12 py-2 border-with-text'>
                            <span className='text-secondary px-2 border border-danger'>Doubt</span>
                        </div>

                        <List className='hide-scrollbar'>
                            {localDoubts?.comments.map((comment, index) => (
                                <div key={index} className='border-bottom border-dark'>
                                    <ListItemButton key={index} alignItems="flex-start">
                                        <ListItemAvatar>
                                            {
                                                (loginUser?._id === doubts.user._id)
                                                    ? <Avatar sx={{ bgcolor: deepPurple[500] }} alt={(comment?.user?.username || '').toUpperCase()} src={comment?.user.image || '#'} />
                                                    : <Avatar sx={{ bgcolor: deepOrange[500] }} alt={(comment?.user?.username || '').toUpperCase()} src={comment?.user.image || '#'} />
                                            }
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <div className='d-flex justify-content-between mb-2'>
                                                    <h5>{comment?.user?.username}</h5>
                                                    <span className='fs-14 text-secondary'>{timeSlince(comment?.createdAt)}</span>
                                                </div>
                                            }
                                            secondary={<p className='m-0 text-light-secondary bg-dark p-2 rounded-bottom rounded-end border border-secondary'>{comment.message}</p>}
                                        />
                                    </ListItemButton>
                                    {
                                        (comment.user._id === loginUser._id) && <div className='col-12 d-flex justify-content-end pb-2'>
                                            <Tooltip title='Edit Comment.'>
                                                <button onClick={() => handleEditCommentButton(comment?._id)} className='fs-14 px-2 bg-transparent border-0 text-secondary hover-orange'>Edit</button>
                                            </Tooltip>
                                            <Tooltip title='Delete Doubt.'>
                                                <button onClick={() => deleteDoubtComment(comment?._id)} className='fs-14 px-2 bg-transparent border-0 text-secondary hover-orange'>Delete</button>
                                            </Tooltip>
                                        </div>
                                    }

                                </div>
                            ))}
                        </List>

                        <div className="input-group pt-3">
                            {localDoubts?.isSolve ? (
                                <span className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 rounded-0 text-danger">This doubt has been closed.</span>
                            ) : (
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="p-0 form-control bg-transparent border border-secondary p-1 fs-16 text-light rounded-0"
                                    placeholder={`Reply to: ${doubts.title}`}
                                />
                            )}
                            {
                                ((inputValue || "").length > 0)
                                    ? <button className="input-group-text p-0 bg-transparent border-secondary border-start-0 rounded-0" onClick={handleReplyEvent}>
                                        <SendIcon className='fs-6 text-orange m-2' />
                                    </button>
                                    : <button className="input-group-text p-0 bg-transparent border-secondary border-start-0 rounded-0">
                                        <SendIcon className='fs-6 text-secondary m-2' />
                                    </button>
                            }
                        </div>
                    </div>
                )}

                <ToastContainer position='bottom-right' theme='colored' />
            </div>
            <Dialog
                open={editBoxopen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setEditBoxOpen(false)}
                aria-describedby="alert-dialog-slide-description"
                maxWidth='md'
                fullWidth
            >
                <div className='bg-dark'>
                    <DialogTitle className='bg-dark-gray text-light'>{`Edit your doubt Tag:${(doubts?.tag || "").toUpperCase()}`}</DialogTitle>
                    <DialogContent className='bg-dark-gray pb-0'>
                        <div className='text-light fs-16 py-2'>
                            <input type="text"
                                className='bg-transparent col-12 border border-secondary p-2 mb-2 text-light'
                                value={editDoubt.title}
                                onChange={handleInputValues}
                                placeholder='Title'
                                name='title'
                            />
                            <textarea
                                className='col-12 text-light bg-transparent p-2'
                                rows={4}
                                name="message"
                                placeholder='Message'
                                value={editDoubt.message}
                                onChange={handleInputValues}
                            ></textarea>
                        </div>
                    </DialogContent>
                    <DialogActions className='bg-dark-gray'>
                        <Button onClick={() => setEditBoxOpen(false)} className='text-info border border-info' >cancel</Button>
                        <Button onClick={handleEditDoubtButton} variant="outlined" className='color-orange border-orange' >Edit</Button>
                    </DialogActions>
                </div>
            </Dialog>

            <Dialog
                open={editCommentOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setEditCommentOpen(false)}
                aria-describedby="alert-dialog-slide-description"
                maxWidth={'sm'}
                fullWidth
            >
                <div className='bg-dark'>
                    <DialogTitle className='bg-dark text-light border-0'>{"Edit your comment."}</DialogTitle>
                    <DialogContent className='bg-dark'>
                        <textarea
                            className='col-12 text-light bg-transparent p-2'
                            rows={3}
                            placeholder='Comment'
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                        ></textarea>
                    </DialogContent>
                    <DialogActions className='bg-dark'>
                        <Button onClick={() => setEditCommentOpen(false)} className='border text-light'>Cancel</Button>
                        <Button onClick={handleEditComment} className='border border-orange color-orange me-3'>Edit</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
}
