import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Problems from './Problems/Problems';
import Doubts from './Doubts/Doubts';
import LiveChallenges from './LiveChallenges/LiveChallenges';
import SolveQuestion from './SolveQuestion/SolveQuestion';
import "./ProblemSolving.css";
import NotFound from '../sharedComponent/NotFound';
import TopicQuestions from './Problems/TopicQuestions';
import CompaniesQuestions from './Problems/CompaniesQuestions';
import ContestRegistration from './Contest/ContestRegistration';
import VirtualContest from './Contest/VirtualContest';

export default function ProblemSolving() {

    return (
        <Routes>
            <Route path='/problems' element={<Problems />} />
            <Route path='/contest' element={<ContestRegistration />} />
            <Route path='/doubts' element={<Doubts />} />
            <Route path='/live-challenge' element={<LiveChallenges />} />
            <Route path='/problem/:id' element={<SolveQuestion /> } />
            <Route path='/topic/:id' element={<TopicQuestions/>}/>
            <Route path='/company/:id' element={<CompaniesQuestions />} />
            <Route path='/contest/:id' element={<VirtualContest /> } />
            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}