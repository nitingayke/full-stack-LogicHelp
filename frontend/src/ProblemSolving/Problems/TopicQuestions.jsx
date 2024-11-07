import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import ShareIcon from '@mui/icons-material/Share';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import { questionsList } from '../../functions';
import QuestionsList from './QuestionsList';

export default function TopicQuestions() {
    const { id } = useParams();
    const [ratingValue, setRatingValue] = useState(5);

    const [filteredQuestions, setFilteredQuestions] = useState([]);

    useEffect(() => {
        const keywords = id.toLowerCase().split(" ");
        const filtered = (questionsList || []).filter(question =>
            question?.topics?.some(topic =>
                keywords.some(keyword => topic.toLowerCase().includes(keyword))
            )
        );
        setFilteredQuestions(filtered);
    }, [id]);


    return (
        <div className='col-12 col-lg-10 mx-auto p-1 d-flex flex-wrap'>
            <div className='p-2 col-12 col-md-4'>
                <div className='bg-dark rounded p-4'>
                    <h1 className='m-0 fw-semibold text-break'>{id}</h1>
                    <p className='pt-2 m-0 fs-16 opacity-25'>LogicHelp</p>
                    <p className='fs-16 '>Total Questions: <span className='fs-5'>{(filteredQuestions || []).length}</span></p>
                    <div>
                        <Rating
                            name="simple-controlled border-light text-light"
                            value={ratingValue}
                            onChange={(event, newValue) => {
                                setRatingValue(newValue);
                            }}
                        />
                        <br />
                        <p className='fs-14'>Rating on this list</p>
                    </div>
                    <ul className='list-unstyled d-flex flex-wrap'>
                        <li> <button className='border py-1 px-2 rounded fs-14 d-flex align-items-center me-1 mb-1'><ShareIcon className='fs-6 pe-1' />share </button></li>
                        <li> <button className='border py-1 px-2 rounded fs-14 d-flex align-items-center me-1 mb-1'><StarBorderPurple500Icon className='fs-5 pe-1' />favorite </button></li>
                        <li> <button className='border py-1 px-2 rounded fs-14 d-flex align-items-center me-1 mb-1'><ReportGmailerrorredIcon className='fs-5 pe-1' />Report </button></li>
                    </ul>
                </div>
            </div>
            <div className='p-2 col-12 col-md-8 fs-16'>
                {/* printing questions */}
                <QuestionsList totalQuestions={filteredQuestions} />
            </div>
        </div>
    )

}