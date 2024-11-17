import React, { useState, useEffect } from 'react';
import ProblemList from './ProblemList';
import "./Problems.css";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CodeIcon from "@mui/icons-material/Code";
import AssessmentIcon from "@mui/icons-material/Assessment";
import WorkIcon from "@mui/icons-material/Work";
import { Link } from 'react-router-dom';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function Problems({ questionsList, loginUser }) {

    const currentDate = new Date();
    
    return (
        <div className='col-12 col-lg-10 col-md-11 mx-auto py-4'>

            <div className='d-flex flex-wrap col-12'>
                <div className='col-md-9 col-12 d-flex flex-wrap fs-16 '>
                    <div className="p-1 mb-1 mb-md-0 col-12 col-md-6">
                        <Link to={"/courses/dsa"} className='text-decoration-none text-white'>
                            <div className="bg-dark-gray rounded p-3 h-100">
                                <h4 className='fw-semibold text-light p-1 rounded'>DSA Course</h4>
                                <p> &nbsp;&nbsp; Master Data Structures and Algorithms. Solve over 700+ problems and build a solid foundation for competitive programming.</p>
                                <ul >
                                    <li><AccessTimeIcon style={{ color: "rgb(255 213 9)" }} className="fs-16" /> Over 50 hours of content</li>
                                    <li><TrendingUpIcon style={{ color: "rgb(86 255 0)" }} className="fs-16" /> Algorithm efficiency</li>
                                    <li><CodeIcon className='color-orange fs-16' /> Hands-on practice</li>
                                </ul>
                            </div>
                        </Link>
                    </div>

                    <div className="p-1 mb-1 mb-md-0 col-12 col-md-6">
                        <Link to={"/courses/sql"} className='text-decoration-none text-white'>
                            <div className="bg-dark-gray rounded p-3 h-100">
                                <h4 className='fw-semibold text-light p-1 rounded'>SQL Course</h4>
                                <p>&nbsp;&nbsp;Learn SQL for data manipulation and analysis. Understand complex queries and database management essentials.</p>
                                <ul className=''>
                                    <li><AccessTimeIcon style={{ color: "rgb(255 213 9)" }} className="fs-16" /> 30 hours of content</li>
                                    <li><AssessmentIcon style={{ color: "rgb(62 255 10)" }} className="fs-16" /> Real-world projects</li>
                                    <li><WorkIcon style={{ color: "rgb(184 73 73)" }} className="fs-16" /> Industry-standard practices</li>
                                </ul>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className='col-md-3 col-12 p-1'>
                    <div className='rounded bg-dark-gray px-2 pb-2'>

                        <Calendar
                            value={currentDate}
                            view="month" // Show only the month view
                            activeStartDate={currentDate} // Set the active month to the current month
                            // onClickDay={(value) => }
                            className="bg-dark-gray border-0 rounded w-fit-content"
                        />
                    </div>
                </div>
            </div>

            <ProblemList questionsList={questionsList} loginUser={loginUser} />
        </div>
    )
}