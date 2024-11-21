import React, { useState } from 'react';

export default function AIBugDetection() {

    const [bugOutput, setBugOutput] = useState("");

    const handleButDetectionEvent = (e) => {
        e.preventDefault();
    }

    return (
        <div className='d-flex align-items-end h-100 p-3 col-12'>
            <div className='col-12'>
                <div className='text-center py-5 px-3'>
                    <h2 className='text-secondary fw-bold'>AI BUG DETECTION</h2>
                    <ul>
                        <li>Syntax Errors</li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>

                <form className='text-center py-3' onSubmit={handleButDetectionEvent}>
                    <textarea
                        className='col-11 bg-transparent text-light p-1'
                        id="bugDescription"
                        placeholder="Describe the bug here..."
                    ></textarea>
                    <br />
                    <button
                        type='submit'
                        className='border-0 rounded mb-4 text-dark bg-info fw-semibold py-2 px-3 but-submit-button'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>

    )
}