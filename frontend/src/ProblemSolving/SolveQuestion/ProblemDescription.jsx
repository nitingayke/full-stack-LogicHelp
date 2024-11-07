import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import RadarIcon from '@mui/icons-material/Radar';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ShareIcon from '@mui/icons-material/Share';

export default function ProblemDescription({ problem }) {
    return (
        <>
            <div className='mb-3 pt-3'>
                <h4 className='fw-semibold'><span className='me-2'>{problem.questionNo}</span><span className='text-break'>{problem.title}</span></h4>
            </div>
            <ul className='list-unstyled fs-14'>
                <li>
                    {problem.category === 'easy' && <span className='text-aqua color-aqua rounded py-1 px-2 bg-light-aqua'>Easy</span>}
                    {problem.category === 'medium' && <span className='text-gold color-aqua rounded py-1 px-2 bg-light-gold'>Medium</span>}
                    {problem.category === 'hard' && <span className='text-red rounded py-1 px-2 bg-light-red'>Hard</span>}
                </li>
            </ul>
            <ul className='mb-5 list-unstyled'>
                {problem.description.map((description, idx) => <li key={idx}><p className='fs-16'>{description}</p></li>)}
                <li>{problem.image && <img src={problem.image} alt="" className='py-3 img-fluid'/>}</li>
            </ul>
            <div>
                {problem.examples.map((example, idx) =>
                    <div key={idx} className='mb-4'>
                        <h6 className='mb-2'>Examples: {idx + 1}</h6>
                        <div className='fs-16'>
                            {example.image && <img src={example.image} alt="" className='py-3 img-fluid'/>}
                            <p className='m-1'>Input: {example.input}</p>
                            <p className='m-1'>Output: {example.output}</p>
                            <p className='m-1 text-light-secondary'>Description: {example.description}</p>
                        </div>
                    </div>
                )}
            </div>
            {problem.followUp && <div className='py-3'>
                <h6 className='fs-16 fw-bold'>Follow Up:</h6>
                {problem.followUp.map((followUp, idx) => <p key={idx} className='fs-16 ps-2 mb-2'>{followUp}</p>)}
            </div>}
            <div className='py-3'>
                <h6>Constraints:</h6>
                {problem.constraints.map((constraint, idx) => <p key={idx} className='fs-16 border-0 w-fit-content px-2 rounded bg-dark mb-1 text-light-secondary'>{constraint}</p>)}
            </div>

            <ul className='list-unstyled fs-14 d-flex flex-wrap text-light-secondary border-bottom border-top border-secondary py-2'>
                <li>
                    <p className='mb-0 border-end border-secondary pe-2'>Acceptance: ?</p>
                </li>
                <li>
                    <p className='mb-0 border-end border-secondary px-2'>Submissions: ?</p>
                </li>
                <li>
                    <p className='mb-0 px-2'>Acceptance: {problem.acceptance}%</p>
                </li>
            </ul>

            {problem.topics && <Accordion sx={{ boxShadow: 'none' }} className='bg-transparent text-light border-bottom border-secondary rounded-0'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className='text-light' />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='px-0  fs-16'
                >
                    <div className='d-flex align-items-center'>
                        <LocalOfferOutlinedIcon className='fs-6 me-2' /> Topics
                    </div>
                </AccordionSummary>
                <AccordionDetails className='pe-0 fs-16'>
                    {problem.topics.map((topic, idx) => <span className='py-1 px-2 rounded m-1 bg-dark' key={idx}>{topic}</span>)}
                </AccordionDetails>
            </Accordion>}

            {problem.company && <Accordion sx={{ boxShadow: 'none' }} className='bg-transparent text-light border-bottom border-secondary rounded-0'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className='text-light' />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='px-0 fs-16'
                >
                    <div className='d-flex align-items-center'>
                        <RadarIcon className='fs-6 me-2' />Company
                    </div>
                </AccordionSummary>
                <AccordionDetails className='pe-0 fs-16'>
                    {problem.company.map((company, idx) => <span className='py-1 px-2 rounded m-1 bg-dark' key={idx}>{company}</span>)}
                </AccordionDetails>
            </Accordion>}

            {problem.hint && <Accordion sx={{ boxShadow: 'none' }} className='bg-transparent text-light border-bottom border-secondary rounded-0'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className='text-light' />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='px-0 fs-16'
                >
                    <div className='d-flex align-items-center'>
                        <TipsAndUpdatesOutlinedIcon className='fs-6 me-2' />Hint
                    </div>
                </AccordionSummary>
                <AccordionDetails className='pe-0 fs-16'>
                    {problem.hint.map((hint, idx) => <p className='m-0' key={idx}>{hint}</p>)}
                </AccordionDetails>
            </Accordion>}

            <Accordion sx={{ boxShadow: 'none' }} className='bg-transparent text-light border-bottom border-secondary rounded-0'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className='text-light' />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='px-0 fs-16'
                >
                    <div className='d-flex align-items-center'>
                        <ChatBubbleOutlineOutlinedIcon className='fs-6 me-2' />Comments
                    </div>
                </AccordionSummary>
                <AccordionDetails className='px-0 fs-16'>

                    <div className='col-12 p-2 question-discussion-box mb-3 border-bottom border-secondary'>
                        <textarea name="usercomment" className='col-12 bg-transparent text-light p-1 border-0' rows={5} placeholder='Share your thoughts or doubts...'></textarea>
                        
                        <div className='col-12 d-flex justify-content-end'>
                            <button type="button" className="btn btn-outline-success">Comment</button>
                        </div>
                    </div>

                    {problem.comments?.map((comment, idx) =>
                        <div key={idx} className='px-2 pb-3 question-discussion-box mb-2'>

                            <div className='d-flex align-items-center py-2 col-12'>
                                <img src="https://assets.leetcode.com/users/Nitin_Gayke/avatar_1729062514.png" alt="" height={40} width={40} className='rounded-circle border border-secondary' />
                                <h5 className='m-0 ps-2 fw-semibold'>{comment.user}</h5>

                                <p className='m-0 ms-auto fs-14 opacity-25'>{comment.createdAt}12-8-2022</p>
                            </div>

                            <p className='m-0'>{comment.text}</p>

                            <ul className='list-unstyled m-0 pt-3 text-secondary d-flex align-items-center'>
                                <li className='px-1'><button className='bg-transparent border-0 me-1'><ArrowCircleUpIcon className='fs-5 text-secondary'/></button></li>
                                <li className='px-1 fs-14'>{56.23}k</li>
                                <li className='px-1'><button className='bg-transparent border-0 me-1'><ArrowCircleDownIcon className='fs-5 text-secondary'/></button></li>
                                <li className='px-1'><button className='bg-transparent border-0 me-1 text-secondary fs-14 d-flex align-items-center'><ShareIcon className='fs-6 me-1'/>Share</button></li>
                            </ul>
                        </div>)}
                </AccordionDetails>
            </Accordion>

        </>
    )
}