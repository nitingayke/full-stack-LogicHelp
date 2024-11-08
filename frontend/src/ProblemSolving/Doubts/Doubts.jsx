import React, { useState } from 'react';
import CreateDoubts from './CreateDoubts';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import SolveDoubtsBox from './SolveDoubtsBox';
import { timeSlince, userDoubts} from '../../functions';

export default function Doubts() {
    const [doubts, setDoubts] = useState(null);

    const handleDoubtClick = (doubtData) => {
        setDoubts(doubtData);
    }
    
    return (
        <div className='col-12 col-lg-10 mx-auto pb-2'>
            <div className='d-flex flex-wrap'>
                <div className='col-12 col-md-7 p-2 pb-0'>
                    <CreateDoubts />
                    <div className='col-md-5 col-12 pb-2 d-md-none'>
                        <SolveDoubtsBox doubts={doubts}/>
                    </div>

                    <div className='bg-dark-gray col-12 rounded p-2'>
                        <div className='p-2 border-bottom border-secondary d-flex justify-content-between'>
                            <h5 className='m-0 fw-semibold text-primary'>User Doubts</h5>
                            <p className='m-0 text-light-secondary fs-16'>Length {userDoubts.length}</p>
                        </div>
                        <List>
                            {userDoubts.map((doubtData, index) => (
                                <ListItemButton key={index} onClick={()=>handleDoubtClick(doubtData)}  alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={doubtData.username} sx={{ bgcolor: deepOrange[500] }} src={doubtData.image} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <h4 className='m-0 text-break'>{doubtData.username}</h4>
                                                <span className='ps-2 m-0 fs-14 text-light-secondary text-break'>{timeSlince(doubtData.createdAt)}</span>
                                            </div>
                                        }
                                        secondary={
                                            <span className='m-0 text-light-secondary fs-14'>{doubtData.title}</span>
                                        } />
                                </ListItemButton>
                            ))}
                        </List>

                    </div>
                </div>

                <div className='col-md-5 col-12 ps-0 p-2 d-none d-md-block'>
                    <SolveDoubtsBox doubts={doubts}/>
                </div>
            </div>
        </div>
    )
}