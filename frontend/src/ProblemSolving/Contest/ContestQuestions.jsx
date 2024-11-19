import React from 'react';
import { Link } from 'react-router-dom';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function ContestQuestions({ questions }) {

    return (
        <div className='d-flex flex-wrap'>
            <table className='col-12 col-md-7 border border-secondary my-3 past-contests-list fs-16 h-fit-content'>
                <thead>
                    <tr>
                        <th className='px-2 py-1 border-end border-secondary'>No</th>
                        <th className='px-2 py-1 border-end border-secondary'>Questions</th>
                        <th className='px-2 py-1'>Level</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !questions
                            ? <tr>
                                <td className='text-center py-3' colSpan={3}>Questions not found</td>
                            </tr>
                            : questions?.questions?.map((question, idx) => (
                                <tr key={idx}>
                                    <td className='px-2 py-1 border-end border-secondary'>{idx + 1}</td>
                                    <td className='px-2 py-1 border-end border-secondary'>
                                        <Link to={`/problem-solving/problem/${question._id}`} className='question-link text-decoration-none' style={{ cursor: "pointer" }}>{question.title}</Link>
                                    </td>
                                    <td className='px-2 py-1 fs-14'>
                                        {question.category === 'easy' && <span className='text-aqua'>Easy</span>}
                                        {question.category === 'medium' && <span className='text-gold'>Medium</span>}
                                        {question.category === 'hard' && <span className='text-red'>Hard</span>}
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
            <div className='col-12 col-md-5 p-md-3 ps-md-3'>
                <h4 className='p-1 border-bottom border-top border-3 border-secondary fw-semibold d-flex align-items-center'><CheckCircleOutlineIcon className='me-1 fs-2 text-success' />Registered Users</h4>
                <ul className='m-0 list-unstyled contest-registed-user'>
                   {
                        ((questions?.participatedUser || []).length == 0) 
                        ? <p className='text-center fs-16 text-secondary'>No User Registered </p>
                        : questions?.participatedUser?.map((users, idx) => (
                            <li key={idx} className='d-flex flex-wrap align-items-center p-2'>
                                <Avatar sx={{ bgcolor: deepPurple[300] }} alt={(users.username || '').toUpperCase()} src={users?.image || '#'}></Avatar>
                                <div className='ps-2'>
                                    <h6 className='m-0 fw-semibold'>{users.username}</h6>
                                    <p className='m-0 fs-16 text-light-secondary'>Total attended contests:  {users.userProgress.contestStatus.length}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}