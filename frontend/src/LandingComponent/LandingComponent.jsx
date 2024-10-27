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
        <div className='col-12 col-md-10 px-2 mx-auto'>
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
                        <CertificateIcon style={{ color: '#FFC107' }} /> Certification Upon Completion
                    </h3>
                    <FeatureComponent description={"Receive a certification after successfully completing each course, which you can showcase on your resume and LinkedIn profile. This certification validates your skills and knowledge, making you more attractive to potential employers."} imgURL={"/assets/certificate.png"} />
                </div>
                <div className="feature">
                    <h3 className="landingpage-section-header fw-semibold m-0">
                        <BuildIcon style={{ color: '#17A2B8' }} /> Build Real Projects
                    </h3>
                    <FeatureComponent description={"Work on hands-on coding projects that simulate real-world challenges. Whether it's developing a full-stack web application or a mobile app, you'll build practical solutions that you can add to your portfolio. These projects are designed to enhance your coding logic and creativity, making you more job-ready."} imgURL={"https://epee-education.com/wp-content/uploads/2023/03/Real-World-Projects-Solving-Real-World-Problems-1.jpg"} />
                </div>
                <div className="feature">
                    <h3 className="landingpage-section-header fw-semibold m-0">
                        <InterviewIcon style={{ color: '#FF5733' }} /> Practice Mock Interviews
                    </h3>
                    <FeatureComponent description={"Prepare for real-life interviews with our mock interview sessions, guided by industry professionals. You'll experience realistic interview questions, receive constructive feedback, and gain the confidence you need to excel in actual interviews. Each session helps you identify areas for improvement and refine your answers."} imgURL={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDWunGzXdPAIc3oK2Q_Se5dglGYP9Y283wwz25BwtSTY5zlOHeXm1v_hxE5AmIVmGZn84&usqp=CAU"} />
                </div>
                <div className="feature">
                    <h3 className="landingpage-section-header fw-semibold m-0">
                        <QuestionAnswerIcon style={{ color: '#6610F2' }} /> Access Interview Questions
                    </h3>
                    <FeatureComponent description={"Gain access to a comprehensive repository of interview questions that have been asked by top companies such as Google, Facebook, and Amazon. Each question comes with detailed explanations, allowing you to explore multiple problem-solving strategies and improve your chances of cracking technical interviews."} imgURL={"https://media.istockphoto.com/id/2162708563/vector/school-exam-results-concept-educational-quiz-score-passing-checklist-checklist-assignment.jpg?s=612x612&w=0&k=20&c=FART8Is2LdBg3TSdFyX_RuipeRCKISyl81AVcAGZi2c="} />
                </div>
                <div className='feature'>
                    <h3 className="landingpage-section-header fw-semibold m-0">
                        <TrackChangesIcon style={{ color: '#6F42C1' }} /> Personalized Learning Path
                    </h3>
                    <FeatureComponent description={"LogicHelp provides a customized learning path based on your skill level and goals. Whether you're aiming to improve your coding skills or get ready for job placements, the platform adapts to guide you step by step toward mastering essential topics and achieving success in your career."} imgURL={"https://www.slideteam.net/media/catalog/product/cache/1280x720/p/a/path_to_success_with_stairs_and_employee_slide01.jpg"} />
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