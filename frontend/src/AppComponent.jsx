import React, { useState, useEffect } from 'react';
import Navbar from './sharedComponent/Navbar';
import Footer from './sharedComponent/Footer';

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage/HomePage.jsx';
import NotFound from './sharedComponent/NotFound.jsx';
import LandingComponent from './LandingComponent/LandingComponent.jsx';

export default function AppComponent() {
    const [loginUser, setLoginUser] = useState("");

    return (
        <BrowserRouter>
        <RedirectIfNotLoggedIn loginUser={loginUser} />
            <Navbar loginUser={loginUser} />
            <div className='dashboard-components py-4'>
                <Routes>
                    <Route path='/' element={<HomePage />} />

                    <Route path='/logout' element={<LandingComponent />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    )
}

function RedirectIfNotLoggedIn({ loginUser }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginUser) {
            navigate("/logout");
        }
    }, [loginUser, navigate]);

    return null; 
}