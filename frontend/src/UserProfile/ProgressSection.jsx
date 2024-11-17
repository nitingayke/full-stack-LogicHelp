import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DoughnutGraph } from '../Chart/DoughnutGraph';
import axios from 'axios';

export default function ProgressSection({ categoryCounts, loginUser }) {
    const [questions, setQuestions] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const getTotalQuestions = async () => {
            try {
                const res = await axios.get("http://localhost:9658/questions/total-questions");
                if (res.data) {
                    setQuestions(res.data);
                }
            } catch (error) {
                setQuestions(null);
            } finally {
                setIsLoading(false);
            }
        }

        getTotalQuestions();
    }, []);

    const category_Questions = {
        easy: 0,
        medium: 0,
        hard: 0
    };

    for (const q of (questions || [])) {
        const category = q.category;
        if (category_Questions[category] !== undefined) {
            category_Questions[category]++;
        }
    }

    const doughnutData = {
        labels: ["Remaining to Solve", 'Easy', 'Medium', 'Hard'],
        datasets: [
            {
                label: 'Problems',
                data: [((category_Questions.easy + category_Questions.medium + category_Questions.hard)
                    - (categoryCounts.easy - categoryCounts.medium - categoryCounts.hard)),
                categoryCounts.easy,
                categoryCounts.medium,
                categoryCounts.hard
                ],
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


            <div className='p-2 consistency-box rounded h-100 mt-3 col-12'>
                <div className='d-flex flex-wrap align-items-center justify-content-center fs-16 py-2 col-12'>

                    <CheckCircleIcon className='fs-6 text-success' />
                    <span className='text-light-secondary pe-2'>Solved:</span>
                    <span> {categoryCounts.easy + categoryCounts.medium + categoryCounts.hard} / {questions?.length || 0}</span>

                </div>

                {isLoading
                    ? <div className="d-flex justify-content-center align-items-center pt-5">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                    : <div className='d-flex justify-content-between'>

                        <div className='col-5 col-md-6 col-lg-4 pb-2 d-flex justify-content-center align-items-center mx-auto'>
                            <DoughnutGraph data={doughnutData} />
                        </div>

                        <div className='col-5 d-grid'>
                            <div className='category-box fs-16 my-2 p-2 p-md-3 d-flex flex-wrap h-fit-content rounded-start border-end border-bottom border-3 border-info'>
                                <span className='text-info pe-1'>Easy:</span><span>{categoryCounts.easy}/{category_Questions?.easy}</span>
                            </div>
                            <div className='category-box fs-16 my-2 p-2 p-md-3 d-flex flex-wrap h-fit-content rounded-start border-end border-bottom border-3 border-warning'>
                                <span className='text-warning pe-1'>Medium:</span><span>{categoryCounts.medium}/{category_Questions?.medium}</span>
                            </div>
                            <div className='category-box fs-16 my-2 p-2 p-md-3 d-flex flex-wrap h-fit-content rounded-start border-end border-bottom border-3 border-danger'>
                                <span className='text-danger pe-1'>Hard:</span><span>{categoryCounts.hard}/{category_Questions?.hard}</span>
                            </div>
                        </div>
                    </div>
                }
                <p className='m-0 fs-16 text-secondary pt-2'>Support Points: <span className='text-light'>{loginUser?.userProgress?.supportPoints}</span></p>
            </div>
        </div>
    )
}