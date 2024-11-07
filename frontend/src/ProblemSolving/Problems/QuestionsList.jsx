import React from 'react';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import { UserProgress } from '../../UserProfile/CurrUser';
import { Link } from 'react-router-dom';


export default function QuestionsList({ totalQuestions  }) {
    const userProgressQuestionNumbers = new Set(UserProgress.questions.map(question => question.questionNo));

    return (
        <>
            {/* printing questions */}
            <table className='col-12 px-2 total-questions'>

                <thead className='border-bottom border-secondary'>
                    <tr>
                        <td className='p-2'>Q/No</td>
                        <td className='p-2'>Title</td>
                        <td className='p-2'>Level</td>
                        <td className='p-2 d-none d-md-table-cell'>Acceptance</td>
                        <td className='p-2 d-none d-md-table-cell'>Status</td>
                    </tr>
                </thead>

                <tbody>
                    {totalQuestions.length === 0 ? (
                        <tr>
                            <td colSpan={5} className='text-center py-5 text-secondary'>No questions found</td>
                        </tr>
                    ) : (
                        totalQuestions.map((data, idx) => (
                            <tr key={idx}>
                                <td className='ps-3 py-2'>{data.questionNo}</td>
                                <td className='px-2 py-2'>
                                    <Link to={`/problem-solving/problem/${data.title}`} className='question-link text-decoration-none text-light'>{data.title}</Link>
                                </td>
                                <td className='px-2 py-2'>
                                    {data.category === 'easy' && <span className='text-aqua'>Easy</span>}
                                    {data.category === 'medium' && <span className='text-gold'>Medium</span>}
                                    {data.category === 'hard' && <span className='text-red'>Hard</span>}
                                </td>
                                <td className='px-2 py-2 d-none d-md-table-cell'>{data.acceptance} %</td>
                                <td className='px-2 py-2 d-none d-md-table-cell'>
                                    {userProgressQuestionNumbers.has(data.questionNo) ? <CheckBoxOutlinedIcon className='color-green fs-6' /> : <CheckBoxOutlineBlankOutlinedIcon className='fs-6' />}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    )
}