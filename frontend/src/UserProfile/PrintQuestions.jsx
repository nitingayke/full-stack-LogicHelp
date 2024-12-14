import React from 'react';
import { Link } from 'react-router-dom';

export default function PrintQuestions({ questions }) {
    return (
        <>
            {(!questions || questions.length == 0) ?
                <p className='text-center fs-16 text-light-secondary py-5 m-0'>No submissions made yet. Start solving problems to track your progress.</p>
                : <ul className='list-unstyled text-light-secondary fs-16 solve-question-list'>
                    {questions.map((question, idx) => (
                        <li key={idx} className='p-2 col-12 d-flex justify-content-between'>
                            <div>
                                <span className='pe-2'>{question.questionNo}</span>
                                <Link to={`/problem-solving/problem/${question._id}`}>
                                    <span className='question-title'>{question.title} </span>
                                </Link>
                            </div>
                            <div>
                                {question.category === "easy" && <span className='px-2 text-aqua'>{question.category}</span>}
                                {question.category === "medium" && <span className='px-2 text-gold'>{question.category}</span>}
                                {question.category === "hard" && <span className='px-2 text-red'>{question.category}</span>}
                                {/* <span className='text-secondary fs-14'>{timeSlince(question.dateSolved)}</span> */}
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </>
    )
}