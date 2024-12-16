import React, { useState, useEffect } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function Contest() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const targetDate = getNextSundayAt8PM();

        const interval = setInterval(() => {
            const now = new Date();
            const timeDiff = targetDate - now;

            if (timeDiff <= 0) {
                setTime("The contest has started!");
                clearInterval(interval);
            } else {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
                const seconds = Math.floor((timeDiff / 1000) % 60);

                setTime(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    function getNextSundayAt8PM() {
        const now = new Date();
        const nextSunday = new Date();

        nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
        nextSunday.setHours(20, 0, 0, 0);  //start at 8PM

        return nextSunday;
    }

    return (
        <>
            <section className='my-2 px-2 py-3 border border-warning text-warning bg-light-gold d-flex'>
                <WarningAmberIcon className='fs-3 me-2' />
                <h3 className='m-0 fw-semibold'>YOU MUST REGISTER AT LEAST 30 MINUTES BEFORE THE CONTEST STARTS <span className='text-danger fs-16 fw-light'>Otherwise, your rank will not reflect on your profile.</span></h3>
            </section>

            <section className='mt-4'>
                <h3 className='ps-2'>Weekly Contest: <span className='fs-2 fw-semibold'>2</span></h3>

                <div className='border border-dark p-2'>
                    <p className='m-0 fw-light text-light-secondary'>Reminder: The Contest Will Start in <span className='text-light'>{time}</span></p>
                </div>
            </section>

            <section className='py-5'>
                <h4>Contest Overview</h4>
                <ul className='fs-16 text-secondary'>
                    <li className='mb-2'>Contest Focus: Data Structures and Algorithms (DSA) - Put your DSA skills to the test across fundamental and advanced topics.</li>
                    <li className='mb-2'>Problem Count: 4 well-rounded problems with increasing difficulty to challenge your logic and problem-solving abilities.</li>
                    <li className='mb-2'>Duration: 90 minutes - manage your time wisely to maximize your score!</li>
                    <li className='mb-2'>Encouragement: No external solutions allowed - solve independently to strengthen your skills and showcase your coding potential.</li>
                </ul>
            </section>
        </>
    )
}