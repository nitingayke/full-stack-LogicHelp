import React, { useEffect, useState } from 'react';
import Contest from './Contest';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ContestQuestions from './ContestQuestions';
import { toast } from 'react-toastify';

export default function VirtualContest() {
    const { id } = useParams();
    const [contestQuestions, setContestsQuestions] = useState();

    useEffect(() => {

        const getVirtualContestQuestions = async () => {
            try {
                const res = await axios.get(`https://loginhelp-backend.onrender.com/contest/virtual-contest/${id}`);

                if (res.status === 200) {
                    setContestsQuestions(res.data.contestQuestions);
                } else {
                    toast.error(errordata.error || 'unable to start virtual contest, please try again.');
                }
            } catch (error) {
                setContestsQuestions(null);
                toast.error(error.message || 'unable to start virtual contest, please try again.');
            }
        }

        getVirtualContestQuestions();

    }, [id]);

    return (
        <div className='col-12 col-md-11 col-lg-10 mx-auto py-4 px-3'>
            <Contest />
            <hr />
            <section>
                <h3 className='m-0'>Contest No: {contestQuestions?.contestNo}</h3>

                <ContestQuestions questions={contestQuestions} />
            </section>
        </div>
    )
}