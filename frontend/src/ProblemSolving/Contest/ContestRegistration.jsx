import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Contest from './Contest';
import CompletedContestList from './CompletedContestList';
import ContestQuestions from './ContestQuestions';
import { ToastContainer, toast } from 'react-toastify';

export default function ContestRegistration() {
    const [contestQuestions, setContestsQuestions] = useState(null);
    const [isRegister, setIsRegister] = useState(false);

    const handleContestRegistration = async() => {
        toast.success('You are getting Registered.');
        setIsRegister(true);
    }

    return (
        <div className='col-12 col-md-11 col-lg-10 mx-auto px-3 py-4 px-md-0'>
            <Contest/>

            <section className='pb-4'>
                <p className='text-warning m- fs-16'>Be aware: Once you register, you will not be able to unregister.</p>
                {
                    (isRegister)
                    ? <button type='button' onClick={handleContestRegistration} className='bg-light-green border border-success px-2 py-1 rounded text-success'>Register For Contest No 2</button>
                    : <button type='button' className='bg-light-green border border-warning px-2 py-1 rounded text-warning'>Registered</button>
                }

                <ContestQuestions questions={contestQuestions}/>
            </section>

            <CompletedContestList />

            <ToastContainer position='bottom-right' theme='colored' />
        </div>
    );
}
