import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Pagination from '@mui/material/Pagination';
import { companies, topics } from '../../functions';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Link, useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionsList from './QuestionsList';

export default function ProblemList({ questionsList, loginUser }) {

    const navigate = useNavigate();

    const [noOfQuestions, setNoOfQuestions] = useState(30);
    const [searchCompany, setSearchCompany] = useState("");
    const [searchQuestion, setSearchQuestion] = useState("");
    const [totalQuestions, setTotalQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const [allQuestions, setAllQuestions] = useState([]);

    useEffect(() => {
        const questions = loginUser?.userProgress?.submissions.flatMap(submission => submission.questions) || [];
       const reverseQuestios = questions.reverse();
        setAllQuestions(reverseQuestios);
    }, [loginUser]);

    const userProgressQuestionNumbers = new Set(allQuestions?.map(question => question.questionNo));

    const matchesStatus = (question) => {
        switch (selectedStatus) {
            case "Todo":
                return !userProgressQuestionNumbers.has(question.questionNo);
            case "Attempt":
                return userProgressQuestionNumbers.has(question.questionNo) && false;
            case "Solve":
                return userProgressQuestionNumbers.has(question.questionNo);
            default:
                return true;
        }
    };

    const filteredQuestions = questionsList.filter((question) => {
        const matchesSearch = question.title.toLowerCase().includes(searchQuestion.toLowerCase()) || question.questionNo === Number(searchQuestion)
        const matchesCategory = selectedCategory ? question.category === selectedCategory.toLowerCase() : true;
        const matchesStatusFilter = matchesStatus(question);

        return matchesSearch && matchesCategory && matchesStatusFilter;
    });

    useEffect(() => {
        setTotalQuestions(filteredQuestions.slice(0, noOfQuestions));
    }, [searchQuestion, selectedCategory, selectedStatus]); // This effect runs whenever 'searchQuestion' or 'noOfQuestions' changes.

    const handleQuestionPages = (e, value) => {
        let start = (value - 1) * noOfQuestions;
        let end = start + noOfQuestions;
        setTotalQuestions(filteredQuestions.slice(start, end));
    }

    const handleTotalQuestions = (num) => {
        setNoOfQuestions(num);
        setTotalQuestions(filteredQuestions.slice(0, num));
    }

    const handlePickRandomQuestion = () => {
        let id = questionsList[Math.floor(Math.random() * questionsList.length)]._id;
        navigate(`/problem-solving/problem/${id}`);
    }

    const trendingCompanies = companies.filter((currCompany) => (currCompany.toLowerCase()).includes(searchCompany.toLowerCase()));

    return (
        <div className='col-12 d-flex flex-wrap'>
            <div className='my-3 py-3 fs-16 col-12 col-md-8 col-lg-9 px-2'>
                
                <div className='pb-3'>
                    <Accordion className='bg-transparent bg-dark-gray'>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon className='text-light'/>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            className='bg-dark-gray text-light ps-4 rounded'
                        >   
                            Topics
                        </AccordionSummary>
                        <AccordionDetails className='bg-dark-gray  rounded-bottom  border-top border-secondary'>
                            <div className='d-flex flex-wrap text-light'>
                                {topics.map((topic, idx) => <Link to={`/problem-solving/topic/${topic}`} className='m-0 py-1 px-2 rounded text-light-secondary m-1 bg-dark-black button-hover text-decoration-none' key={idx}>{topic}</Link> )}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>

                { /* functionality */ }
                <ul className='list-unstyled d-flex flex-wrap fs-16'>

                    <li className='pe-2 py-1'>
                        <button type="button" className="btn text-light dropdown-toggle fs-16 bg-dark-gray border-0" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-3'>{!selectedCategory ? "Category" : selectedCategory}</span>
                        </button>
                        <ul className="dropdown-menu fs-16 bg-dark-gray question-search-option">
                            <li><button type='button' onClick={() => setSelectedCategory("")}>All</button></li>
                            <li><button type='button' onClick={() => setSelectedCategory("Easy")} className='text-aqua'>Easy</button></li>
                            <li><button type='button' onClick={() => setSelectedCategory("Medium")} className='text-gold'>Medium</button></li>
                            <li><button type='button' onClick={() => setSelectedCategory("Hard")} className='text-red'>Hard</button></li>
                        </ul>
                    </li>
                    <li className='pe-2 py-1'>
                        <button type="button" className="btn text-light dropdown-toggle fs-16 bg-dark-gray border-0" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-3'>{!selectedStatus ? "Status" : selectedStatus}</span>
                        </button>
                        <ul className="dropdown-menu fs-16 bg-dark-gray question-search-option">
                            <li><button onClick={() => setSelectedStatus("")} type='button'><DoneOutlineIcon className='fs-6 me-2' />All</button></li>
                            <li><button onClick={() => setSelectedStatus("Todo")} type='button'><LockOpenOutlinedIcon className='fs-6 me-2' />Todo</button></li>
                            <li><button onClick={() => setSelectedStatus("Attempt")} type='button' className='color-gold'><WatchLaterOutlinedIcon className='color-gold fs-6 me-1' /> Attempt</button></li>
                            <li><button onClick={() => setSelectedStatus("Solve")} type='button' className='color-green align-items-center'><CheckBoxOutlinedIcon className='color-green fs-6 me-1' />Solve</button></li>
                        </ul>
                    </li>

                    <li className='pe-2 py-1 flex-1'>
                        <div className="input-group bg-dark-gray rounded py-1 flex-nowrap">
                            <button className="input-group-text bg-transparent text-light-secondary px-2 py-1 border-0 border-end border-secondary" id="basic-addon1"><SearchIcon className='fs-6' /></button>
                            <input type="text" value={searchQuestion} onChange={(e) => setSearchQuestion(e.target.value)} className="form-control bg-transparent fs-16 border-0 px-2 py-0 text-light rounded" placeholder="Search questions..." />
                        </div>
                    </li>
                    <li className='py-1'>
                        <button type='button' className='bg-transparent p-1 rounded border border-success d-flex align-items-center pe-2 text-light button-hover' onClick={handlePickRandomQuestion}>
                            <ShuffleIcon className='fs-6 me-1 text-gold' />Pick Random
                        </button>
                    </li>
                </ul>

                {/* printing questions */}
                <QuestionsList totalQuestions={totalQuestions} userProgressQuestion={userProgressQuestionNumbers} />

                <div className='d-flex justify-content-between pt-3'>
                    <Pagination count={Math.floor((filteredQuestions.length + (noOfQuestions - 1)) / noOfQuestions)} variant="outlined" color="secondary" shape="rounded" sx={{
                        "& .MuiPaginationItem-root": {
                            color: "white",
                            borderColor: "white",
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: "orange",
                            color: "black",
                            borderColor: "orange",
                        },
                    }} onChange={handleQuestionPages} />

                    <div className='pe-2 py-1'>
                        <button type="button" className="btn text-light dropdown-toggle fs-16 bg-dark-gray border-0" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-3'>{noOfQuestions} / Page</span>
                        </button>
                        <ul className="dropdown-menu fs-16 bg-dark-gray text-light question-search-option">
                            <li><button type='button' onClick={() => handleTotalQuestions(30)}>30 / Page</button></li>
                            <li><button type='button' onClick={() => handleTotalQuestions(50)}>50 / Page</button></li>
                            <li><button type='button' onClick={() => handleTotalQuestions(100)}>100 / Page</button></li>
                        </ul>
                    </div>
                </div>

            </div>

            <div className='my-3 pt-3 ps-0 ps-md-3 fs-16 col-md-4 col-lg-3'>
                <div className='bg-dark-gray col-12 rounded p-3'>
                    <h5 className='fw-bold '>Trending Companies</h5>
                    <input type="text" value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} placeholder='Search company' className='text-light col-12 border-0 p-1 px-2 mb-3 bg-dark-black rounded' />

                    <div className='d-flex flex-wrap text-light-secondary'>
                        {trendingCompanies.map((company, idx) => <Link to={`/problem-solving/company/${company}`}  key={idx} className='text-decoration-none text-white'><div className='bg-dark-black py-1 px-2 m-1 rounded button-hover cursor-pointer'>{company}</div></Link>)}
                    </div>
                </div>
            </div>
        </div>
    )
}