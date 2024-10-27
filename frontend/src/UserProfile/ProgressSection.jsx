import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DoughnutGraph } from '../Chart/DoughnutGraph';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';

export default function ProgressSection({ categoryCounts }) {

    const doughnutData = {
        labels: ["Remaining to Solve", 'Easy', 'Medium', 'Hard'],
        datasets: [
            {
                label: 'Solved Problems',
                data: [40, 19, 12, 3],
                backgroundColor: [
                    '#6f6f6d42',
                    'aqua',
                    'gold',
                    'red',
                ],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className='col-12 mb-3 d-flex flex-wrap justify-content-between'>
            <div className='col-12 mt-3 col-md-6 consistency-box rounded px-2 mt-2'>

                <div className='d-flex flex-wrap align-items-center justify-content-center fs-16 py-2 col-12'>

                    <CheckCircleIcon className='fs-6 text-success' />
                    <span className='text-light-secondary pe-2'>Solved:</span>
                    <span> {categoryCounts.easy + categoryCounts.medium + categoryCounts.hard} / 5000</span>

                </div>

                <div className='d-flex justify-content-between'>

                    <div className='col-6 pb-2'>
                        <DoughnutGraph data={doughnutData} />
                    </div>

                    <div className='col-5'>
                        <div className='category-box fs-16 my-2 p-2 d-flex flex-wrap'>
                            <span className='text-aqua pe-1'>Easy:</span><span>{categoryCounts.easy}/200</span>
                        </div>
                        <div className='category-box fs-16 my-2 p-2 d-flex flex-wrap'>
                            <span className='text-gold pe-1'>Medium:</span><span>{categoryCounts.medium}/565</span>
                        </div>
                        <div className='category-box fs-16 my-2 p-2 d-flex flex-wrap'>
                            <span className='text-red pe-1'>Hard:</span><span>{categoryCounts.hard}/399</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className='col-12 col-md-5 consistency-box rounded px-2 mt-3'>
                <div className='rounded p-2'>
                    <div className=' text-center'>
                        <h5 className='col-12 fw-bold text-light-secondary'>You are in Top</h5>
                        <p className='fs-1 col-12'>50%</p>
                    </div>
                    <div className='text-secondary'>
                        <p className='m-0 fs-16 pb-1'><LightbulbIcon className='fs-6 text-gold me-1' />Solutions: <span className='text-light-secondary'>50+</span></p>
                        <p className='m-0 fs-16 pb-1'><VisibilityIcon className='fs-6 text-primary me-1' />Solution Views: <span className='text-light-secondary'>8964</span></p>
                        <p className='m-0 fs-16 pb-1'><StarIcon className='fs-6 color-green me-1' />Support Points: <span className='text-light-secondary'>66</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}