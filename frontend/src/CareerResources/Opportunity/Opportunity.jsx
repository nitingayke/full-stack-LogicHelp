import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SignpostIcon from '@mui/icons-material/Signpost';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { timeSlince } from '../../functions';

export default function Opportunity() {
    const [totalJobs, setTotalJobs] = useState([]);
    const [inputValue, setInputValue] = useState({ query: "", location: "" });
    const [showSearch, setShowSearch] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Update input value handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prevValues) => ({ ...prevValues, [name]: value }));
    };

    // Fetch jobs from the backend
    const fetchJobs = async () => {
        try {
            setIsLoading(true);
            setError(null); // Reset error before fetching

            const { query, location } = inputValue;
            const response = await axios.post('https://logichelp-backend.onrender.com/api/find-posted-jobs', {
                query: query || 'Software Engineer Jobs',
                location: location || 'India',
            });

            if (response.success && response.data.jobs) {
                setTotalJobs(response.data.jobs);
            } else {
                setTotalJobs([]);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load opportunities. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch jobs on component mount
    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSearchSubmit = () => {
        fetchJobs();
        setShowSearch(false);
    };

    const handleSearchToggle = () => setShowSearch(!showSearch);

    const handleCancelSearch = () => {
        setShowSearch(false);
        setInputValue({ query: "", location: "" });
    };

    // JSX for search UI
    const searchForm = (
        <div className='position-absolute bottom-0 start-0 py-2 px-3 w-100 bg-dark rounded-2 text-light search-z-index'>
            <div className='d-flex justify-content-between align-items-center mb-2'>
                <input
                    type="text"
                    name="query"
                    value={inputValue.query}
                    onChange={handleInputChange}
                    placeholder="Enter job title (e.g., Software Engineer)"
                    className="form-control me-2"
                />
                <input
                    type="text"
                    name="location"
                    value={inputValue.location}
                    onChange={handleInputChange}
                    placeholder="Enter location (e.g., India)"
                    className="form-control me-2"
                />
                <button className="btn btn-success me-2" onClick={handleSearchSubmit}>
                    Search
                </button>
                <button className="btn btn-danger" onClick={handleCancelSearch}>
                    Cancel
                </button>
            </div>
        </div>
    );

    // Loading state
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center text-muted fs-5 my-5">
                <div className="spinner-border me-2"></div>Loading Opportunities...
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="text-center text-danger my-5 fs-6">
                {error}
            </div>
        );
    }

    return (
        <div className='col-md-10 mx-auto p-2 h-100'>
            {showSearch ? searchForm : (
                <button
                    className='position-absolute border-0 bottom-0 py-1 px-2 fs-14 ms-1 w-fit-content text-info mb-2 bg-dark rounded-1 search-z-index'
                    onClick={handleSearchToggle}
                >
                    Search Job
                </button>
            )}

            <div className='d-flex flex-wrap'>
                {totalJobs.length > 0 ? (
                    totalJobs.map((job, index) => (
                        <div key={index} className='p-2 col-md-6 col-lg-4'>
                            <div className='card h-100 bg-transparent hover-bg-dark border border-dark p-2 rounded-2'>
                                <p className='fs-16 text-secondary mb-2'>
                                    <SignpostIcon className='fs-16' />
                                    <span> posted on: {timeSlince(job.created)} ago</span>
                                </p>
                                <div className='flex-1 p-1 rounded'>
                                    <h2 className='fw-semibold text-orange pacity-75 fs-2'>{job.title}</h2>
                                    
                                    <p className='m-0 fs-16 mb-2 pre-wrap-space text-secondary truncate-text'>
                                        <span className='text-light-secondary'>Job Description:</span> {job.description || "N/A"}
                                    </p>

                                    <p className='fs-16 text-secondary m-0 d-flex align-items-center'>
                                        <span className='text-light-secondary me-1'>Location: </span>{job.location?.display_name}
                                        <a
                                            href={`https://www.google.com/maps?q=${job.latitude},${job.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <LocationOnOutlinedIcon className='fs-6' />
                                        </a>
                                    </p>
                                    <p className='fs-16 m-0 text-secondary'>
                                        <span className='text-light-secondary'>Stipend:</span> {job.salary_max || "N/A"} &#8377;
                                    </p>
                                </div>
                                <hr className='m-0 text-light my-2' />
                                <div className='d-flex pt-2 justify-content-between'>
                                    <strong className='text-light-secondary fs-5 text-break'>{job.company.display_name}</strong>
                                    <a
                                        href={job.redirect_url || "#"}
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        className='text-decoration-none'
                                    >
                                        <button type="button" className="fs-16 px-3 py-1 btn rounded-4 border border-orange text-orange btn-outline-warning h-fit-content">View</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='flex-1 fw-semibold fs-2 py-5 opacity-25 h-100 d-flex justify-content-center align-items-center'>
                        {inputValue.query || inputValue.location
                            ? `No jobs found for "${inputValue.query}" in "${inputValue.location}".`
                            : "No jobs found today."}
                    </div>
                )}
            </div>
        </div>
    );
}
