import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Problems from './Problems/Problems';
import Contest from './Contest/Contest';
import Doubts from './Doubts/Doubts';
import LiveChallenges from './LiveChallenges/LiveChallenges';

export default function ProblemSolving() {

    return (
        <Routes>
            <Route path='/problems' element={<Problems />} />
            <Route path='/contest' element={<Contest />} />
            <Route path='/doubts' element={<Doubts />} />
            <Route path='/live-challenge' element={<LiveChallenges />} />
        </Routes>
    )
}