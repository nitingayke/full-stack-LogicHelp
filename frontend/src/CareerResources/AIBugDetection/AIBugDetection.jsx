import React, { useState } from 'react';

export default function AIBugDetection() {

    const [userInput, setuserInput] = useState("");
    const [bugOutput, setBugOutput] = useState();
    const [question, setQuestion] = useState();

    const handleButDetectionEvent = (e) => {
        e.preventDefault();
        setQuestion(userInput);
    }

    return (
        <div className='d-flex align-items-end h-100 p-3 col-12'>
            <div className='col-12 col-md-9 col-lg-8 mx-auto'>
                <div className='text-center py-5 px-3'>
                    <h2 className='text-light-secondary fw-bold'>AI BUG DETECTION</h2>
                    <p className='m-0 text-secondary fs-16'>This AI will help you to execute</p>
                    <p className='m-0 text-secondary fs-16'>Syntax Errors, Logical Errors, Runtime Errors, Database Issues, Code Quality Issues, Performance Issues, etc</p>
                </div>
                {
                    question && <p className='mb-2 text-light fs-6 p-2 rounded-top-3 rounded-start-3 bg-dark-gray w-fit-content'>{question}</p>
                }
                {
                    !bugOutput && 
                    <div className='text-light-secondary fs-6 p-2 rounded-bottom-4 rounded-end-4 bg-dark-gray w-fit-content'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam fugit porro ullam rerum magni dignissimos dolores officia magnam commodi ad saepe distinctio, mollitia veritatis, sunt iste blanditiis reprehenderit beatae enim.</div>
                }

                <form className='text-center py-3' onSubmit={handleButDetectionEvent}>
                    <textarea
                        className='col-12 bg-transparent text-light p-1'
                        id="bugDescription"
                        placeholder="Describe the bug here..."
                        value={userInput}
                        onChange={(e)=>setuserInput(e.target.value)}
                    ></textarea>
                    <br />
                    <button
                        type='submit'
                        className='border-0 rounded text-dark bg-info fw-semibold py-2 px-3 but-submit-button'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>

    )
}