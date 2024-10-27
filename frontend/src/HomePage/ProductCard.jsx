import React from 'react';
import { Link } from 'react-router-dom';
import CardHeader from './CardHeader';

export default function ProductCard() {
    return (
        <div className='col-lg-5'>
            <div className='col-12 rounded p-2'>
                <div className='rounded p-2 product-card'>

                    <CardHeader imgURL={"/assets/AIBugDetection.jpeg"} title={"AI Bug Detection"} rating={69.99} star={3} newBatchLaunch={false}/>

                    <p className='m-0 fs-16 card-about-prodcut'>An intelligent bug detection tool that uses AI algorithms to identify and suggest fixes for common coding issues, improving code quality and reducing debugging time.</p>

                    <div className='col-12 d-flex justify-content-end'>
                        <Link to={"/career-resources/ai-bug-detection"}>
                            <button className='product-card-button mt-3'>Try for Free</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='col-12 rounded p-2'>
                <div className='rounded p-2 product-card'>
                    <CardHeader imgURL={"/assets/Courses.webp"} title={"Courses"} rating={99.99} star={5} newBatchLaunch={true}/>

                    <div className='card-about-prodcut'>
                        <div>
                            <p className='m-0 fs-16'>Dive into our extensive library of IT courses covering topics like AI/ML, C, C++, DSA, Full-Stack, SQL, Python, and more. Learn at your own pace with expert instructors.</p>
                            <hr className='m-0 my-2' />
                            <p className='m-0 fs-14 text-secondary'>Certification Available</p>
                            <blockquote className='fs-14 text-secondary m-0'>"These courses helped me land my first job!" - John D.</blockquote>
                        </div>
                    </div>

                    <div className='col-12 d-flex justify-content-end'>
                        <Link to={"/career-resources/courses"}>
                            <button className='product-card-button mt-3'>Explore Courses</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='col-12 rounded p-2'>
                <div className='rounded p-2 product-card'>
                    <CardHeader imgURL={"/assets/Project.jpg"} title={"Project"} rating={88.29} star={4}  newBatchLaunch={true}/>

                    <div className='card-about-prodcut'>
                        <div>
                            <p className='m-0 fs-16'>This project will help you improve your problem-solving skills, enhance your coding logic, and inspire new ideas. Perfect for both beginners and experienced developers looking to challenge themselves and grow.</p>
                            <hr className='m-0 my-2' />
                            <p className='m-0 fs-14 text-secondary'>Certification Available</p>
                            <blockquote className='fs-14 text-secondary m-0'>"This project helped me get shortlisted at MANG! The skills I gained through building it made my resume stand out." - Alex T.</blockquote>
                        </div>
                    </div>

                    <div className='col-12 d-flex justify-content-end'>
                        <Link to={"/career-resources/projects"}>
                            <button className='product-card-button mt-3'>Explore Project</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='col-12 rounded p-2'>
                <div className='rounded p-2 product-card'>

                    <CardHeader imgURL={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJMf-ie8e0HaCYJTlBJKy11wANgNcaOHjYjQ&s"} title={"Interview Questions Repository"} rating={77.99} star={4} newBatchLaunch={true}/>

                    <div className='card-about-prodcut'>
                        <div>
                            <p className='m-0 fs-16'> Prepare for your interviews with our extensive collection of previously asked questions across multiple domains, including <strong>Data Structures & Algorithms (DSA)</strong>, <strong>SQL</strong>, and more. Each question comes with detailed solutions and multiple approaches, allowing you to understand different problem-solving techniques.</p>
                            <blockquote className='fs-14 text-secondary m-0'>
                                Categories: DSA, SQL, System Design, Algorithms, and more!
                            </blockquote>
                        </div>
                    </div>
                    <div className='col-12 d-flex justify-content-end'>
                        <Link to={"/career-resources/interview-questions"}>
                            <button className='product-card-button mt-3'>Explore Questions</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='col-12 rounded p-2'>
                <div className='rounded p-2 product-card'>

                    <CardHeader imgURL={"/assets/mock-interview.png"} title={"Mock Interviews"} rating={66.32} star={3} />

                    <div className='card-about-prodcut'>
                        <div>
                            <p className='m-0 fs-16'> Prepare for your next interview with our comprehensive mock interview sessions. Experience real interview scenarios with seasoned professionals, designed to enhance your confidence and interview skills.</p>
                            <blockquote className='fs-14 text-secondary m-0'>
                                "The mock interviews helped me identify my weaknesses and improve significantly!" - Ravi K.
                            </blockquote>
                        </div>
                    </div>
                    <div className='col-12 d-flex justify-content-end'>
                        <Link to={"/career-resources/mock-interview"}>
                            <button className='product-card-button mt-3'>Start Practicing</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='col-12 rounded p-2'>
                <div className='rounded p-2 product-card'>

                    <CardHeader imgURL={"/assets/opportunity.png"} title={"Job, Internship & Hackathon Opportunities"} rating={89.01} star={4}  newBatchLaunch={true}/>

                    <p className='m-0 fs-16 card-about-prodcut'>An intelligent bug detection tool that uses AI algorithms to identify and suggest fixes for common coding issues, improving code quality and reducing debugging time.</p>

                    <div className='col-12 d-flex justify-content-end'>
                        <Link to={"/career-resources/opportunities"}>
                            <button className='product-card-button mt-3'>View Opportunities</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}