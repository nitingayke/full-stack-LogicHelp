import React from 'react';
import { pastContests } from '../../functions';
import { Link } from 'react-router-dom';

export default function CompletedContestList() {
    return (
        <div className='col-12'>
            <h3>Past Contests</h3>
            <table className="col-12 border border-secondary my-3 past-contests-list fs-16 text-center">
                <thead>
                    <tr>
                        <th className='p-2'>Contest Name</th>
                        <th className='p-2'>Date</th>
                        <th className='p-2'>Length</th>
                        <th className='p-2'>Virtual Contest</th>
                    </tr>
                </thead>
                <tbody>
                    {pastContests.map((contest, idx) => (
                        <tr key={idx}>
                            <td className='p-2'>{contest.contestTitle}</td>
                            <td className='fs-14 p-2'>
                                <div className='mb-0'>{contest.time}</div>
                                <div className='mb-0'>{contest.date}</div>
                            </td>
                            <td className='p-2'>{contest.contestRanking.length}</td>
                            <td className='p-2'>
                                <Link to={`/problem-solving/contest/${(contest.contestTitle)}`} className='border py-1 px-2 rounded border-secondary text-decoration-none hover-component'>Start</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
