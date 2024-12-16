import React, { useEffect, useState } from 'react';
import "./LandingComponent.css";
import BookIcon from '@mui/icons-material/Book';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonacoEditor from '../MonacoEditor/MonacoEditor';
import Rating from '@mui/material/Rating';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';



export default function LandingComponent() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    const [feedbacks, setFeedbacks] = useState();
    useEffect(() => {
        const getTotalFeedback = async() => {
            try {
                const { data } = await axios.get("https://loginhelp.onrender.com/user/total-feedback");
                const { success, feedbacks } = data;
              
                if(success){
                    setFeedbacks(feedbacks);
                }
            } catch (error) {
                setFeedbacks();
            }
        }
        getTotalFeedback();
    }, []);

    return (
        <div className='col-12 col-md-10 px-2 mx-auto py-4'>
            <div className='py-5 text-center border-bottom border-secondary'>
                <h3 className='fw-semibold text-light responsive-heading'>
                    LOGICHELP application is designed to empower users, simplifying their tasks and enhancing their experiences.
                    With each line of code, we're building a tool that transforms <span className='text-danger'>challenges</span> into <span className='text-success'>solutions!</span>
                </h3>
            </div>
            <section className='pt-5 border-bottom border-secondary pb-4 text-center'>

                <div className="pb-3">
                    <h4 className="landingpage-section-header fw-semibold m-0">
                        <BookIcon style={{ color: '#007BFF' }} /> Learn DSA (Data Structures and Algorithms)
                    </h4>
                    <p className='col-md-8 mx-auto'>Master the core concepts of Data Structures and Algorithms with detailed explanations, 50+ essential topics, interactive video solutions, and ready-to-use source code. Build a strong foundation to excel in technical interviews and competitive programming.</p>
                </div>

                <div className='pb-3'>
                    <h4 className="landingpage-section-header fw-semibold m-0">
                        <SchoolIcon style={{ color: '#28A745' }} /> Comprehensive Course Library
                    </h4>
                    <p className='col-md-8 mx-auto'>Unlock a rich library of courses covering essential programming languages like Java, C++, Python, and more. Whether you're a beginner or an advanced learner, find the right course tailored to your learning journey and career goals.</p>
                </div>

                <div className='pb-3'>
                    <h4 className="landingpage-section-header fw-semibold m-0">
                        <PeopleIcon className='text-info' /> Doubt Solving
                    </h4>
                    <p className='col-md-8 mx-auto'>Got stuck? Post your doubts in the dedicated doubt section and get responses from fellow learners and experts. Collaborate, share ideas, and overcome challenges together as a community.</p>
                </div>

                <div className='pb-3'>
                    <h4 className="landingpage-section-header fw-semibold m-0">
                        <AdjustOutlinedIcon style={{ color: '#DC3545' }} /> Live Challenge
                    </h4>
                    <p className='col-md-8 mx-auto'>Participate in thrilling live challenges designed to test and enhance your skills. Create innovative applications, design stunning webpages, and solve real-world problems. Share your solutions and learn from others in a vibrant, competitive environment.</p>
                </div>

                <div className='pb-3'>
                    <h4 className="landingpage-section-header fw-semibold m-0">
                        <WorkOutlineIcon className='text-warning' /> Daily Posted Job Updates
                    </h4>
                    <p className='col-md-8 mx-auto'>Stay ahead in your career with up-to-date job and internship postings. Search for roles based on your skills and preferred locations, and seize the opportunities that align with your aspirations. Stay informed and get hired!</p>
                </div>

            </section>

            <section id="testimonials" className='pt-5 border-bottom border-secondary pb-4'>
                <h3 className="landingpage-section-header fw-semibold m-0">Your Code Playground</h3>
                <MonacoEditor />
            </section>

            <section className='pt-5 border-bottom border-secondary pb-4'>
                <h3 className="landingpage-section-header fw-semibold m-0">
                    <CheckCircleIcon style={{ color: '#007BFF' }} /> Process Explaining How Users Can Start Using LogicHelp
                </h3>
                <ol className="step">
                    <li>
                        <p>Sign up and create an account.</p>
                    </li>
                    <li>
                        <p>Pick your coding problems or project-based challenges.</p>
                    </li>
                    <li>
                        <p>Practice, get detailed feedback, and improve.</p>
                    </li>
                    <li>
                        <p>Apply for jobs, internships, or participate in coding events.</p>
                    </li>
                </ol>
            </section>

            {feedbacks?.length > 0 && <section className='pt-5 pb-4 col-12'>
                <h3 className="landingpage-section-header p-0 fw-semibold m-0">Feedback:</h3>

                <div className='users-feedback align-items-center d-md-none'>
                    {feedbacks.map((feedback, index) =>
                        <div key={index} className='col-md-6 col-lg-5 col-12 py-3'>
                            <div className='m-3 feedback-box'>
                                <h5 className='fw-semibold p-3 pb-0'>{feedback.name} - <span>{feedback.branch}</span></h5 >
                                <p className='px-3 mb-0'><Rating name="read-only" className='feedback-rating px-2' value={feedback.star} readOnly /></p>
                                <p className='m-0 fs-16 px-3 pt-2 feedback-description'>{feedback.description}</p>
                                <p className='p-3 pt-2 m-0 col-12 d-flex justify-content-end text-secondary fst-italic'>{feedback.company}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="slider-container d-none d-md-block">
                    <Slider {...settings}>
                        {feedbacks.map((feedback, index) =>
                            <div key={index} className='col-md-6 col-lg-5 col-12 py-3'>
                                <div className='m-3 feedback-box'>
                                    <h5 className='fw-semibold p-3 pb-0'>{feedback.name} - <span>{feedback.branch}</span></h5 >
                                    <p className='px-3 mb-0'><Rating name="read-only" className='feedback-rating px-2' value={feedback.star} readOnly /></p>
                                    <p className='m-0 fs-16 px-3 pt-2 feedback-description'>{feedback.description}</p>
                                    <p className='p-3 pt-2 m-0 col-12 d-flex justify-content-end text-secondary fst-italic'>{feedback.company}</p>
                                </div>
                            </div>
                        )}
                    </Slider>
                </div>


            </section>}
        </div>
    )
}