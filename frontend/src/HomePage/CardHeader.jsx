import React from 'react';
import Rating from '@mui/material/Rating';

export default function CardHeader({ imgURL, title, rating, star, newBatchLaunch = false }) {
    return (
        <div className='d-flex pb-3'>
            <img src={imgURL} alt="" className='img-fluid col-2 rounded h-fit-content' />

            <div className='ps-3 flex-1'>
                <h3 className='bugdetection-card-title fw-bold'>{title}</h3>
                <p className='d-flex m-0'><span className='fs-16 text-secondary'>{rating}%</span><Rating name="read-only" value={star} readOnly /></p>
                <p className='fs-14 m-0 text-secondary'>Free</p>
            </div>
            {newBatchLaunch && <span className="badge rounded-pill text-bg-danger h-fit-content">new</span>}
        </div>
    )
}