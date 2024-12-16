import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { timeSlince } from '../../functions';

export default function Courses() {
    const [totalCourses, setTotalCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const response = await axios.get("https://loginhelp-backend.onrender.com/api/total-courses");

                if (response.success && response?.data?.totalCourses?.length > 0) {
                    setTotalCourses(response.data.totalCourses);
                }
            } catch (error) {
                setError("Failed to load courses. Please try again later.");
                setTotalCourses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCourses();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center text-muted fs-5 my-5">
                <div className="spinner-border me-2"></div>Loading courses...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-danger my-5 fs-6">
                {error}
            </div>
        );
    }

    return (
        <div className="d-flex flex-wrap col-12 col-md-10 mx-auto h-100 py-2">
            {totalCourses?.length > 0 ? (
                totalCourses.map((course, idx) => (
                    <div key={idx} className="col-md-6 col-lg-4 p-1">
                        <a
                            href={`https://www.youtube.com/watch?v=${course.video?.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                        >
                            <div className="card h-100 bg-transparent border border-dark rounded p-2 hover-bg-dark">
                                <img
                                    src={course.snippet?.thumbnails?.medium?.url}
                                    alt={course.snippet?.title}
                                    className="col-12 img-fluid rounded col-12"
                                />

                                <h5 className="m-0 fw-semibold text-light text-break pt-2">{course.snippet?.title}</h5>
                                <p className="m-0 pt-1 text-light fs-16 text-break flex-1">{course.snippet?.description}</p>
                                <p className="mb-1 fs-16 text-light-secondary text-break ms-auto">Published: {timeSlince(course.snippet?.publishedAt)} ago</p>
                            </div>
                        </a>
                    </div>
                ))
            ) : (
                <div className="d-flex justify-content-center align-items-center text-muted fs-5 my-5 col-12">
                    No courses available.
                </div>
            )}
        </div>
    );
}
