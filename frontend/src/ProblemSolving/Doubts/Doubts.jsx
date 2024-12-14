import React, { useEffect, useState } from 'react';
import CreateDoubts from './CreateDoubts';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import SolveDoubtsBox from './SolveDoubtsBox';
import { timeSlince } from '../../functions';
import axios from 'axios';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LinearProgress from '@mui/material/LinearProgress';

import { io } from 'socket.io-client';
const socket = io('https://loginhelp-backend.onrender.com');

export default function Doubts({ loginUser }) {
    const [doubts, setDoubts] = useState(null);
    const [allDoubts, setAllDoubts] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleDoubtClick = (doubtData) => {
        setDoubts(doubtData);
    }

    useEffect(() => {
        const handleNewDoubt = (data) => {
            setAllDoubts((prev) => ([
                data?.newDoubt,
                ...prev
            ]));
        }

        const handleDeletedDoubt = (data) => {
            setAllDoubts((prev) =>
                prev?.filter((d) => d._id !== data.doubt_id)
            );
            setDoubts(null);
        }

        const handleUpdatedDoubt = (data) => {
            setDoubts(data.currDoubt);
            setAllDoubts((prev) =>
                prev.map((doubt) =>
                    doubt._id === data._id ? data : doubt
                )
            );
        }

        const handleDeleteDoubtComment = (data) => {
            const { doubt_id, comment_id } = data;

            setAllDoubts((prevDoubts) => {
                return prevDoubts.map((doubt) => {
                    if (doubt._id === doubt_id) {
                        return {
                            ...doubt,
                            comments: doubt.comments.filter((comment) => comment._id !== comment_id),
                        }
                    }
                    return doubt;
                });
            });

            setDoubts((prev) => ({
                ...prev,
                comments: prev.comments.filter((comment) => comment._id !== comment_id),
            }));
        }

        const handleUpdatedDoubtComment = (data) => {
            const { newMessage, doubt_id, comment_id } = data;

            setAllDoubts((prevDoubts) =>
                prevDoubts.map((doubt) =>
                    doubt._id === doubt_id
                        ? {
                            ...doubt,
                            comments: doubt.comments.map((comment) =>
                                comment._id === comment_id
                                    ? { ...comment, message: newMessage }
                                    : comment
                            ),
                        }
                        : doubt
                )
            );

            setDoubts((prev) =>
                prev && prev._id === doubt_id
                    ? {
                        ...prev,
                        comments: prev.comments.map((comment) =>
                            comment._id === comment_id
                                ? { ...comment, message: newMessage }
                                : comment
                        ),
                    }
                    : prev
            );
        };


        socket.on('added-new-doubt', handleNewDoubt);
        socket.on('deleted-doubt', handleDeletedDoubt);
        socket.on('edited-user-doubt', handleUpdatedDoubt);
        socket.on('doubt-comment-deleted', handleDeleteDoubtComment);
        socket.on('edited-doubt-comment', handleUpdatedDoubtComment);

        return () => {
            socket.off('added-new-doubt', handleNewDoubt);
            socket.off('deleted-doubt', handleDeletedDoubt);
            socket.off('edited-user-doubt', handleUpdatedDoubt);
            socket.off('doubt-comment-deleted', handleDeleteDoubtComment);
            socket.off('edited-doubt-comment', handleUpdatedDoubtComment);
        }
    }, [doubts?._id]);

    useEffect(() => {
        const getAllDoubts = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get('https://loginhelp-backend.onrender.com/doubts/all-doubts');

                if (res.status === 200) {
                    setAllDoubts(res.data.allDoubts);
                }
            } catch (error) {

            } finally {
                setIsLoading(false);
            }
        }
        getAllDoubts();
    }, []);

    return (
        <div className='col-12 col-lg-10 mx-auto pb-2'>
            <div className='d-flex flex-wrap'>
                <div className='col-12 col-md-7 p-2 pb-0'>
                    <CreateDoubts loginUser={loginUser} />
                    <div className='col-md-5 col-12 pb-2 d-md-none'>
                        <SolveDoubtsBox doubts={doubts} loginUser={loginUser} />
                    </div>

                    <div className='bg-dark-gray col-12 rounded p-2'>
                        <div className='p-2 d-flex justify-content-between'>
                            <h5 className='m-0 fw-semibold text-primary'>User Doubts</h5>
                            <p className='m-0 text-light-secondary fs-16'>Total: {(allDoubts || []).length}</p>
                        </div>
                        {
                            (isLoading)
                                ? <LinearProgress color="inherit" />
                                : <hr className='m-0' />
                        }
                        <List>
                            {
                                (!allDoubts)
                                    ? <p className='text-center py-3 m-0 fs-16'>No doubts available or an error occurred.</p>
                                    : allDoubts?.map((doubtData, index) => (
                                        <ListItemButton key={index} onClick={() => handleDoubtClick(doubtData)} alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt={(doubtData?.user?.username || "").toUpperCase()} sx={{ bgcolor: deepOrange[500] }} src={doubtData?.user?.image || '#'} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <h4 className='m-0 text-break'>{doubtData?.user?.username}</h4>
                                                        <span className='ps-2 m-0 fs-14 text-light-secondary text-break'>{timeSlince(doubtData.createdAt)}</span>
                                                    </div>
                                                }
                                                secondary={
                                                    <div className='d-flex'>
                                                        <span className='m-0 text-light-secondary fs-14 pe-2'>{doubtData?.tag}</span>
                                                        {
                                                            (doubtData.isSolve)
                                                                ? <span className='m-0 text-danger fs-14 d-flex align-items-center'><CloseOutlinedIcon className='fs-16' />Doubt closed</span>
                                                                : <span className='m-0 fs-16 text-info'><TaskOutlinedIcon className='fs-16 me-1 mb-1' />Doubt is open to work</span>
                                                        }
                                                    </div>
                                                }
                                                primaryTypographyProps={{ component: 'span' }}
                                                secondaryTypographyProps={{ component: 'span' }}
                                            />

                                        </ListItemButton>
                                    ))
                            }
                        </List>

                    </div>
                </div>

                <div className='col-md-5 col-12 ps-0 p-2 d-none d-md-block'>
                    <SolveDoubtsBox doubts={doubts} loginUser={loginUser} />
                </div>
            </div>

        </div>
    )
}