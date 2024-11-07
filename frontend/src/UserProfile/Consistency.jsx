import React, { useState } from 'react';
import { UserProgress } from './CurrUser';
import LineGraph from '../Chart/LingGraph';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { VerticalGraph } from '../Chart/VerticalGraph';
import SearchIcon from '@mui/icons-material/Search';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { searchQuestions } from '../functions.js';
import PrintQuestions from './PrintQuestions.jsx';
import ProgressSection from './ProgressSection.jsx';

export default function Consistency() {
    const [search, setSearch] = useState("");
    const [prevSelected, setPrevSelected] = useState("option-1");
    const [solvedQuestion, setSolvedQuestion] = useState(UserProgress.questions);


    const labels = UserProgress.contestStatus.map((data) => data.contest);
    const lineData = {
        labels,
        datasets: [
            {
                label: 'Contest Rank',
                data: UserProgress.contestStatus.map((data) => data.rank),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const submissionData = {
        labels: UserProgress.submissions.map((data) => data.date),
        datasets: [
            {
                label: 'total submission',
                data: UserProgress.submissions.map((data) => data.submissions),
                backgroundColor: 'green',
            },
        ],
    };


    const latestRank = UserProgress.contestStatus.length > 0 ? UserProgress.contestStatus[UserProgress.contestStatus.length - 1].rank : 0;
    const totalAttempts = UserProgress.contestStatus.length;


    const categoryCounts = {
        easy: 0,
        medium: 0,
        hard: 0
    };

    for (const question of UserProgress.questions) {
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
                setSolvedQuestion(UserProgress.questions);
            } else if (innerText === 'favorite') {
                setSolvedQuestion(UserProgress.questions.filter((data) => data.favorite));
            } else {
                setSolvedQuestion(UserProgress.questions.filter((data) => data.category === innerText));
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

            <ProgressSection categoryCounts={categoryCounts} />

            <div className='col-12 mb-3 consistency-box p-3 rounded'>
                <h5 className='d-flex'><CodeIcon className='text-aqua me-1' />Languages</h5>

                {UserProgress.languages.map((data, index) => {
                    const [language, score] = Object.entries(data)[0];

                    return (
                        <div className='d-flex justify-content-between text-secondary' key={index}>
                            <span>{language}</span>
                            <span className='flex-1 border-secondary mx-3 language-interval-line'></span>
                            <p className='m-0 fs-16'><span className='text-light fs-6'>{score}</span> problems solved</p>
                        </div>
                    );
                })}

                <hr className='text-secondary' />

                <h5 className='m-0 d-flex align-items-center'><CheckCircleOutlineIcon className='fs-5 me-1 color-green' />Skills</h5>
                <ul className='d-flex flex-wrap list-unstyled m-0'>
                    {UserProgress.skills.map((skill, index) => (
                        <li className='px-2 py-1 m-1 selected-link fs-16 rounded text-light-secondary' key={index}>
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>

            <div className='col-12 mb-3 consistency-box p-3 rounded'>
                <div className='d-flex flex-wrap justify-content-between align-items-center pb-4'>
                    <h6 className='m-0 d-flex fs-5'>Submissions in the past one month</h6>

                    <div className='fs-14 text-secondary d-flex'>
                        <p className='m-0 me-2'>Total active day <span className='fs-16 text-light-secondary'>{UserProgress.activeDay}</span></p>
                        <p className='m-0'>Total streak <span className='fs-16 text-light-secondary'>{UserProgress.totalStreak}</span></p>
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
