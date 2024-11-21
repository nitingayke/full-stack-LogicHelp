import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AIBugDetection from './AIBugDetection/AIBugDetection';
import Courses from './Courses/Courses';
import InterviewQuestions from './InterviewQuestions/InterviewQuestions';
import MockInterviews from './MockInterviews/MockInterviews';
import Opportunity from './Opportunity/Opportunity';
import Projects from './Projects/Projects';
import './CareerResources.css';

export default function CareerResources({ loginUser }) {

    return (
        <Routes>
            <Route path='/ai-bug-detection' element={<AIBugDetection />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/interview-questions' element={<InterviewQuestions />} />
            <Route path='/mock-interview' element={<MockInterviews />} />
            <Route path='/opportunities' element={<Opportunity />} />
            <Route path='/projects' element={<Projects />} />
        </Routes>
    )
}