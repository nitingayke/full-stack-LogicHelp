import React, { useEffect } from 'react';
import Contest from './Contest';
import { useParams } from 'react-router-dom';
import ProblemList from '../Problems/ProblemList';
import { pastContests } from '../../functions';
import ContestQuestions from './ContestQuestions';

export default function VirtualContest(){
    const { id } = useParams();
    const contestQuestions = pastContests.find((p) => p?.contestTitle === id);

    return (
        <div className='col-12 col-md-11 col-lg-10 mx-auto py-4'>
            <Contest/>
            <hr />
            <section>
                <h3>{id}</h3>

                <ContestQuestions questions={contestQuestions.problemList} />
            </section>
        </div>
    )
}