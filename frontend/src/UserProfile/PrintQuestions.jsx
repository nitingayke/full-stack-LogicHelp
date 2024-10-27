import React from 'react';
import { timeSlince } from '../functions.js';

export default function PrintQuestions({ questions }) {
    return (
        <ul className='list-unstyled text-light-secondary fs-16 solve-question-list'>
            {questions.map((question, idx) => (
                <li key={idx} className='p-2 col-12 d-flex justify-content-between'>
                    <div>
                        <span className='pe-2'>{question.questionNo}</span>
                        <span className='question-title'>{question.title}  </span>
                    </div>
                    <div>
                        {question.category === "easy" && <span className='px-2 text-aqua'>{question.category}</span>}
                        {question.category === "medium" && <span className='px-2 text-gold'>{question.category}</span>}
                        {question.category === "hard" && <span className='px-2 text-red'>{question.category}</span>}
                        <span className='text-secondary fs-14'>{timeSlince(question.dateSolved)}</span>
                    </div>
                </li>
            ))}
        </ul>
    )
}