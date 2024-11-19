import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import axios from 'axios';

export default function ProblemSolving({ loginUser }) {
    const [questionsList, setQuestionsList] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true); 
                const res = await axios.get("http://localhost:9658/questions/total-questions");
                if (res.data) {
                    setQuestionsList(res.data);
                }
            } catch (error) {
                setQuestionsList([]);
            } finally {
                setLoading(false); // End loading after fetch attempt
            }
        };

        fetchQuestions();
    }, []);

    return (
        <Routes>
            <Route
                path='/problems'
                element={loading
                    ? <div className='col-12 text-center py-5'>
                        <div className="spinner-border text-light"></div>
                    </div>
                    : <Problems questionsList={questionsList} loginUser={loginUser} />}
            />
            <Route path='/contest' element={<ContestRegistration />} />
            <Route path='/doubts' element={<Doubts loginUser={loginUser}/>} />
            <Route path='/live-challenge' element={<LiveChallenges />} />
            <Route path='/problem/:id' element={<SolveQuestion loginUser={loginUser}/>} />
            <Route path='/topic/:id' element={<TopicQuestions questionsList={questionsList} loginUser={loginUser} />} />
            <Route path='/company/:id' element={<CompaniesQuestions questionsList={questionsList} loginUser={loginUser} />} />
            <Route path='/contest/:id' element={<VirtualContest />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}
