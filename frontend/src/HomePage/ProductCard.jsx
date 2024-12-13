import React from 'react';
import { Link } from 'react-router-dom';
import CardHeader from './CardHeader';

export default function ProductCard() {
    return (
        <div className='d-flex flex-wrap'>
            <div className='col-lg-6 col-12 rounded p-2'>
                <div className='d-flex flex-column rounded p-2 product-card h-100'>

                    <CardHeader imgURL={"/assets/AIBugDetection.jpeg"} title={"AI Bug Detection"} rating={69.99} star={3} newBatchLaunch={false}/>

                    <p className='m-0 fs-16 card-about-prodcut flex-1'>An intelligent bug detection tool that uses AI algorithms to identify and suggest fixes for common coding issues, improving code quality and reducing debugging time.</p>
                    
                    <div className='col-12 d-flex justify-content-end'>
                        <Link to={"/career-resources/ai-bug-detection"}>
                            <button className='product-card-button mt-3'>Try for Free</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='col-lg-6 col-12 rounded p-2'>
                <div className='d-flex flex-column rounded p-2 product-card h-100'>
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

            <div className='col-lg-6 col-12 rounded p-2'>
                <div className='d-flex flex-column rounded p-2 product-card h-100'>

                    <CardHeader imgURL={"/assets/opportunity.png"} title={"Job, Internship & Hackathon Opportunities"} rating={89.01} star={4}  newBatchLaunch={true}/>

                    <p className='m-0 fs-16 card-about-prodcut'>Explore a wide range of job opportunities that match your skills and expertise. From tech to management, find positions in top companies and accelerate your career with the right job.</p>

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