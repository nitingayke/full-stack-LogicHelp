import React, { useState, useEffect } from 'react';
import LineGraph from '../Chart/LingGraph';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { VerticalGraph } from '../Chart/VerticalGraph';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { searchQuestions } from '../functions.js';
import PrintQuestions from './PrintQuestions.jsx';
import ProgressSection from './ProgressSection.jsx';

export default function Consistency({ currUser }) {
    const [search, setSearch] = useState("");
    const [prevSelected, setPrevSelected] = useState("option-1");
    const [solvedQuestion, setSolvedQuestion] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);

    useEffect(() => {
        const questions = currUser?.userProgress?.submissions.flatMap(submission => submission.questions) || [];
       const reverseQuestios = questions.reverse();
        setAllQuestions(reverseQuestios);
        setSolvedQuestion(reverseQuestios);
    }, [currUser]);

    const labels = currUser?.userProgress?.contestStatus.map((data) => data.contest);
    const lineData = {
        labels,
        datasets: [
            {
                label: 'Contest Rank',
                data: currUser?.userProgress?.contestStatus.map((data) => data.rank),
                borderColor: '#ffffff',
                backgroundColor: '#ff5722',
            },
        ],
    };

    const last30Submissions = currUser?.userProgress?.submissions.slice(-30);
    const submissionData = {
        labels: last30Submissions?.map((data) => data.date.slice(0, 10)),
        datasets: [
            {
                label: 'total submission',
                data: last30Submissions?.map((data) => data?.questions.length),
                backgroundColor: '#30d630',
            },
        ],
    };

    const latestRank = (currUser?.userProgress?.contestStatus?.at(-1)?.rank || 0); 
    const totalAttempts = currUser?.userProgress?.contestStatus.length;

    const categoryCounts = {
        easy: 0,
        medium: 0,
        hard: 0
    };

    for (const question of allQuestions) {
        const category = question.category;
        if (categoryCounts[category] !== undefined) {
            categoryCounts[category]++;
        }
    }


    const handleSeletedOption = (e) => {
        if (!(e.currentTarget.classList.contains("selected-option"))) {

            document.getElementById(prevSelected).classList.remove("selected-option");
            e.currentTarget.classList.add("selected-option");
            setPrevSelected(e.currentTarget.id);

            let innerText = e.target.innerText.toLowerCase();

            if (innerText === 'all') {
                setSolvedQuestion(allQuestions);
            } else if (innerText === 'favorite') {
                setSolvedQuestion(currUser?.userProgress?.favoriteQuestion || []);
            } else {
                setSolvedQuestion(allQuestions.filter((data) => data.category === innerText));
            }
        }
    };

    const filteredQuestions = searchQuestions(solvedQuestion, search);

    return (
        <>
            <div className='col-12 mt-3 p-3 consistency-box rounded'>
                <div className='d-flex'>
                    <div className='col-4'>
                        <p className='text-light-secondary m-0 fs-16'>Contest Rating: </p>
                        <p className='fs-2'>{(latestRank).toLocaleString("en-IN")}</p>
                        <p className='text-light-secondary m-0 fs-16'>Total Attempts: </p>
                        <p className='fs-5 m-0'>{totalAttempts}</p>
                    </div>
                    <div className='col-8 border-start border-secondary ps-2'>
                        <LineGraph data={lineData} />
                    </div>
                </div>
            </div>

            <ProgressSection categoryCounts={categoryCounts} currUser={currUser} />

            <div className='col-12 mb-3 consistency-box p-3 rounded'>
                <h5 className='d-flex'><CodeIcon className='text-aqua me-1' />Languages</h5>

                {
                    (!currUser?.userProgress?.languages || currUser?.userProgress?.languages.length === 0)
                        ? <p className='text-center fs-16 text-light-secondary py-3 m-0'>Solve questions to add languages to your profile.</p>
                        : currUser?.userProgress?.languages.map((languageData, index) => {
                            return (
                                <div className='d-flex justify-content-between text-secondary' key={index}>
                                    <span>{languageData.language}</span>
                                    <span className='flex-1 border-secondary mx-3 language-interval-line'></span>
                                    <p className='m-0 fs-16'>
                                        <span className='text-light fs-6'>{languageData.number.length}</span> problems solved
                                    </p>
                                </div>
                            );
                        })
                }


                <hr className='text-secondary' />

                <h5 className='m-0 d-flex align-items-center'><CheckCircleOutlineIcon className='fs-5 me-1 color-green' />Skills</h5>
                <ul className='d-flex flex-wrap list-unstyled m-0'>
                    {
                        currUser?.userProgress?.skills.map((skill, index) => (
                            <li className='px-2 py-1 m-1 selected-link fs-16 rounded text-light-secondary' key={index}>
                                {skill}
                            </li>
                        ))
                    }
                    {
                        (currUser?.userProgress?.skills?.length === 0) && (
                            <p className="text-center col-12 py-3 fs-16 text-light-secondary m-0">
                                You haven't added any skills yet. <br />
                                Start solving problems to unlock and add skills to your profile!
                            </p>
                        )
                    }
                </ul>
            </div>

            <div className='col-12 mb-3 consistency-box p-3 rounded'>
                <div className='d-flex flex-wrap justify-content-between align-items-center pb-4'>
                    <h6 className='m-0 d-flex fs-5'>Submissions in the past one month</h6>

                    <div className='fs-14 text-secondary d-flex'>
                        <p className='m-0 me-2'>Total active day <span className='fs-16 text-light-secondary'>{currUser?.userProgress?.submissions?.length || 0}</span></p>
                        <p className='m-0'>Total streak <span className='fs-16 text-light-secondary'>{currUser?.userProgress?.totalStreak || 0}</span></p>
                    </div>
                </div>

                <VerticalGraph data={submissionData} />
            </div>

            <div className='col-12 mb-3 consistency-box p-3 rounded'>
                <h5 className='fs-5 pb-2 d-flex align-items-center'><PlaylistAddCheckCircleIcon className='fs-5 me-1 color-green' />Solved Questions</h5>

                <div className="input-group flex-nowrap mb-4">
                    <span className='input-group-text bg-transparent border-secondary text-light-secondary'>{solvedQuestion.length}</span>
                    <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} className="form-control bg-transparent border-secondary text-light" placeholder="search in solved question" aria-label="Username" aria-describedby="addon-wrapping" />
                    <button className="input-group-text bg-transparent text-light-secondary border-secondary" id="addon-wrapping"><SearchIcon /> </button>
                </div>

                <ul className='list-unstyled d-flex sort-questions fs-16'>
                    <li className='px-2'>
                        <button className='bg-transparent text-light selected-option' id='option-1' onClick={handleSeletedOption}>All</button>
                    </li>
                    <li className='px-2'>
                        <button className='bg-transparent text-light' id='option-2' onClick={handleSeletedOption}>Easy</button>
                    </li>
                    <li className='px-2'>
                        <button className='bg-transparent text-light' id='option-3' onClick={handleSeletedOption}>Medium</button>
                    </li>
                    <li className='px-2'>
                        <button className='bg-transparent text-light' id='option-4' onClick={handleSeletedOption}>Hard</button>
                    </li>
                    <li className='px-2'>
                        <button className='bg-transparent text-light' id='option-5' onClick={handleSeletedOption}>Favorite</button>
                    </li>
                </ul>

                <PrintQuestions questions={filteredQuestions} />
            </div>
        </>
    );
}