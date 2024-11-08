import React from 'react';
import { contestQuestions } from '../../functions';
import { Link } from 'react-router-dom';
import Contest from './Contest';
import CompletedContestList from './CompletedContestList';
import ContestQuestions from './ContestQuestions';

export default function ContestRegistration() {
    return (
        <div className='col-12 col-md-11 col-lg-10 mx-auto px-3 py-4 px-md-0'>
            <Contest/>

            <section className='pb-4'>
                <p className='text-warning m- fs-16'>Be aware: Once you register, you will not be able to unregister.</p>
                <button type='button' className='bg-light-green border border-success px-2 py-1 rounded text-success'>Register For 423 Contest</button>

                <ContestQuestions questions={contestQuestions || []}/>
            </section>

            <CompletedContestList />
        </div>
    );
}