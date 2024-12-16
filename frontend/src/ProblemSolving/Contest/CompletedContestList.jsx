import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

export default function CompletedContestList() {
    const [pastContests, setPastContests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getPastContestData = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get('https://logichelp-backend.onrender.com/contest/past-contests');

                if (res.status === 200) {
                    setPastContests(res.data.allContest);
                }
            } catch (error) {

            } finally {
                setIsLoading(false);
            }
        }
        getPastContestData();
    }, []);

    return (
        <div className='col-12'>
            <h3>Past Contests</h3>
            {
                isLoading 
                ? <div className='text-center py-2'>
                    <LinearProgress color="secondary" />
                    <p className='m-0 py-3'>Loading...</p>
                </div>
                : <table className="col-12 border border-secondary my-3 past-contests-list fs-16 text-center">
                    <thead>
                        <tr>
                            <th className='p-2'>Contest Name</th>
                            <th className='p-2'>Date</th>
                            <th className='p-2'>Registration</th>
                            <th className='p-2'>Virtual Contest</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastContests.map((contest, idx) => (
                            <tr key={idx}>
                                <td className='p-2'>{contest.contestNo}</td>
                                <td className='fs-14 p-2'>
                                    <div className='mb-0'>{contest.date.substring(0, 10)}</div>
                                </td>
                                <td className='p-2'>{contest.participatedUser.length}</td>
                                <td className='p-2'>
                                    <Link to={`/problem-solving/contest/${(contest._id)}`} className='border py-1 px-2 rounded border-secondary text-decoration-none hover-component'>Start</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}
