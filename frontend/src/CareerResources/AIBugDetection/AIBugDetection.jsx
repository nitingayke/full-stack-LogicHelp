import React, { useState } from 'react';
import axios from 'axios';
import '../CareerResources.css';

export default function AIBugDetection() {

    const [userInput, setUserInput] = useState("");
    const [bugOutput, setBugOutput] = useState();

    const [question, setQuestion] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleButDetectionEvent = async (e) => {
        e.preventDefault();

        setBugOutput();
        setQuestion(userInput);

        try {
            setIsLoading(true);
            const response = await axios.post('https://loginhelp-backend.onrender.com/api/execute-user-bug', {
                userDoubt: userInput,
            });
            setBugOutput(response.data.response);
        } catch (error) {
            setBugOutput(error?.response?.data?.error?.message || error?.response?.data.error || 'An error occurred while fetching the response.');
        } finally {
            setUserInput("");
            setIsLoading(false);
        }
    }

    return (
        <div className='d-flex align-items-end h-100 p-3 col-12'>
            <div className='col-12 col-md-9 col-lg-8 mx-auto'>
                {
                    (!question) &&
                    <div className='text-center py-5 px-3'>
                        <h2 className='text-light-secondary fw-bold'>AI BUG DETECTION</h2>
                        <p className='m-0 text-secondary fs-16'>This AI will help you to execute</p>
                        <p className='m-0 text-secondary fs-16'>Syntax Errors, Logical Errors, Runtime Errors, Database Issues, Code Quality Issues, Performance Issues, etc</p>
                    </div>
                }
                {
                    question && <div className='pre-wrap-space mb-2 text-light fs-6 p-2 rounded-top rounded-start bg-dark w-fit-content d-flex'>
                        {question}
                        {isLoading && <div className="spinner-border spinner-border-sm text-orange ms-2"></div>}
                    </div>
                }
                {
                    bugOutput &&
                    (
                        bugOutput.includes("429")
                            ? (
                                <p className='m-0 pre-wrap-space text-danger fs-6 p-2 rounded-bottom rounded-end w-fit-content border border-danger bg-light-red'>
                                    {bugOutput}
                                </p>
                            ) : (
                                <p className='text-light-secondary pre-wrap-space fs-6 p-2 rounded-bottom rounded-end bg-dark w-fit-content'>
                                    {bugOutput}
                                </p>
                            )
                    )
                }


                <form className='text-center py-3' onSubmit={handleButDetectionEvent}>
                    <textarea
                        className='col-12 bg-transparent text-light p-2 border-secondary'
                        id="bugDescription"
                        placeholder="Describe the bug here..."
                        value={userInput}
                        rows={4}
                        onChange={(e) => setUserInput(e.target.value)}
                    ></textarea>
                    <br />
                    {
                        (userInput?.length > 0)
                            ? <button
                                type='submit'
                                className='border-0 rounded text-dark bg-info fw-semibold py-2 px-3 but-submit-button'>Submit
                            </button>
                            : <button
                                type='button'
                                className='border border-info rounded text-info bg-transparent fw-semibold py-2 px-3 but-submit-button'>Submit
                            </button>
                    }
                </form>
            </div>
        </div>

    )
}