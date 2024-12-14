import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AIBugDetection from './AIBugDetection/AIBugDetection';
import Courses from './Courses/Courses';
import Opportunity from './Opportunity/Opportunity';
import './CareerResources.css';

export default function CareerResources({ loginUser }) {

    return (
        <Routes>
            <Route path='/ai-bug-detection' element={<AIBugDetection />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/opportunities' element={<Opportunity />} />
        </Routes>
    )
}