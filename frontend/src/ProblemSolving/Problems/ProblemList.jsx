import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShuffleIcon from '@mui/icons-material/Shuffle';

export default function ProblemList({ list }) {
    return (
        <div className=''>
            <ul className='list-unstyled d-flex flex-wrap m-0 fs-16'>
                <li className='px-2 py-1'>
                    <button type="button" class="btn text-light dropdown-toggle fs-16 bg-dark-gray border-0" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className='me-3'>List</span>
                    </button>
                    <ul class="dropdown-menu fs-16 bg-dark-gray text-light question-search-option">
                        <li><button type='button'>LogicHelp Advanced Questions</button></li>
                        <li><button type='button'>Top Interview Questions</button></li>
                        <li><button type='button'>SQL Questions</button></li>
                        <li><button type='button'>Favorite</button></li>
                    </ul>
                </li>
                <li className='px-2 py-1'>
                    <button type="button" class="btn text-light dropdown-toggle fs-16 bg-dark-gray border-0" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className='me-3'>Category</span>
                    </button>
                    <ul class="dropdown-menu fs-16 bg-dark-gray text-light question-search-option">
                        <li><button type='button'>Easy</button></li>
                        <li><button type='button'>Medium</button></li>
                        <li><button type='button'>Hard</button></li>
                    </ul>
                </li>
                <li className='px-2 py-1'>
                    <button type="button" class="btn text-light dropdown-toggle fs-16 bg-dark-gray border-0" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className='me-3'>Status</span>
                    </button>
                    <ul class="dropdown-menu fs-16 bg-dark-gray text-light question-search-option">
                        <li><button type='button'>Todo</button></li>
                        <li><button type='button'>Solve</button></li>
                        <li><button type='button'>Attempt</button></li>
                    </ul>
                </li>
                <li className='px-2 py-1'>
                    <button type="button" class="btn text-light dropdown-toggle fs-16 bg-dark-gray border-0" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className='me-3'>Tags</span>
                    </button>
                    <ul class="dropdown-menu fs-16 bg-dark-gray text-light question-search-option">
                        <li><button type='button'>Arrays</button></li>
                        <li><button type='button'>String</button></li>
                        <li><button type='button'>Dynamic Programming</button></li>
                        <li><button type='button'>Stack</button></li>
                    </ul>
                </li>

                <li className='px-2 py-1 flex-1'>
                    <div className="input-group bg-dark-gray rounded py-1 flex-nowrap">
                        <button className="input-group-text bg-transparent text-light-secondary px-1 py-1 border-0 border-end border-secondary" id="basic-addon1"><SearchIcon className='fs-6' /></button>
                        <input type="text" className="form-control bg-transparent fs-16 border-0 px-2 py-0 text-light rounded" placeholder="Search questions..." />
                    </div>
                </li>
                <li className='px-2 py-1'>
                    <button type='button' className='border-0 p-1 rounded bg-success d-flex align-items-center px-2'><ShuffleIcon className='fs-6 me-1 text-gold'/>Pick Random</button>
                </li>
            </ul>
        </div>
    )
}