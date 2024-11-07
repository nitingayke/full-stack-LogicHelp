import React from 'react';
import { Link } from 'react-router-dom';

export default function ContestQuestions({ questions }) {
    return (
        <table className='col-12 col-md-8 col-lg-7 border border-secondary my-3 past-contests-list fs-16'>
            <thead>
                <tr>
                    <th className='px-2 py-1 border-end border-secondary'>No</th>
                    <th className='px-2 py-1 border-end border-secondary'>Questions</th>
                    <th className='px-2 py-1'>Level</th>
                </tr>
            </thead>
            <tbody>
                {questions.map((question, idx) => (
                    <tr key={idx}>
                        <td className='px-2 py-1 border-end border-secondary'>{question.questionNo}</td>
                        <td className='px-2 py-1 border-end border-secondary'>
                            <Link to={`/problem-solving/problem/${question.title}`} className='question-link text-decoration-none' style={{cursor: "pointer"}}>{question.title}</Link>
                        </td>
                        <td className='px-2 py-1 fs-14'>
                            {question.category === 'easy' && <span className='text-aqua'>Easy</span>}
                            {question.category === 'medium' && <span className='text-gold'>Medium</span>}
                            {question.category === 'hard' && <span className='text-red'>Hard</span>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}