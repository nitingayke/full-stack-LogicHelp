import React from 'react';
import "./LandingComponent.css";
import BookIcon from '@mui/icons-material/Book';
import SchoolIcon from '@mui/icons-material/School';
import CertificateIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import InterviewIcon from '@mui/icons-material/Chat';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FeatureComponent from './FeatureComponent';
import MonacoEditor from '../MonacoEditor/MonacoEditor';
import { feedbacks } from './TempFeedback';
import Rating from '@mui/material/Rating';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



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

    return (
        <div className='col-12 col-md-10 px-2 mx-auto py-4'>
            <div className='py-5 text-center border-bottom border-secondary'>
                <h3 className='fw-semibold text-light responsive-heading'>
                    LOGICHELP application is designed to empower users, simplifying their tasks and enhancing their experiences.
                    With each line of code, we're building a tool that transforms <span className='text-danger'>challenges</span> into <span className='text-success'>solutions!</span>
                </h3>
            </div>
            <section className='pt-5 border-bottom border-secondary pb-4'>

                <div className="feature">
                    <h3 className="landingpage-section-header fw-semibold m-0">
                        <BookIcon style={{ color: '#007BFF' }} /> Learn DSA (Data Structures and Algorithms)
                    </h3>
                    <FeatureComponent description={"Master key concepts in Data Structures and Algorithms through a wide variety of problems, ranging from beginner to advanced levels. LogicHelp provides detailed solutions and multiple approaches to help you understand the problem-solving process deeply. This will strengthen your foundation for technical interviews and coding competitions."} imgURL={"https://thedigitaladda.com/wp-content/uploads/Data-Structure-Algorithms.png"} />
                </div>

                <div className='feature'>
                    <h3 className="landingpage-section-header fw-semibold m-0">
                        <SchoolIcon style={{ color: '#28A745' }} /> Comprehensive Course Library
                    </h3>
                    <FeatureComponent description={"Explore a vast collection of IT courses covering various topics such as AI/ML, Data Structures, Web Development, Python, and more. Each course is designed to provide in-depth knowledge and practical skills, allowing you to learn at your own pace and convenience."} imgURL={"https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/05/23151218/BA-Courses.png"} />
                </div>

                <div className='feature'>
                    <h3 className="landingpage-section-header fw-semibold m-0">
                        <PeopleIcon style={{ color: '#DC3545' }} /> Community Support
                    </h3>
                    <FeatureComponent description={"Join a vibrant community of learners where you can ask questions, share knowledge, and collaborate with peers. Participate in discussions, study groups, and networking opportunities that enrich your learning experience and help you build valuable connections in the tech industry."} imgURL={"/assets/community.jpg"} />
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

            <section className='pt-5 pb-4 col-12'>
                <h3><span className="landingpage-section-header fw-semibold m-0">Feedback: </span><span className='fs-5 fw-normal text-secondary'>What Our Users Are Saying</span></h3>

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


            </section>
        </div>
    )
}