import React, { useState, useEffect } from 'react';
import Navbar from './sharedComponent/Navbar';
import Footer from './sharedComponent/Footer';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage/HomePage.jsx';
import NotFound from './sharedComponent/NotFound.jsx';
import LandingComponent from './LandingComponent/LandingComponent.jsx';
import Loginin from './UserLogin/Login.jsx';
import Signup from './UserLogin/Signup.jsx';
import ProblemSolving from './ProblemSolving/ProblemSolving.jsx';
import CareerResources from './CareerResources/CareerResources.jsx';

export default function AppComponent() {
    const [loginUser, setLoginUser] = useState("");

    return (
        <BrowserRouter>
            <Navbar loginUser={loginUser} />
            <div className='dashboard-components py-4'>
                <Routes>
                    <Route path='/' element={<HomePage />} />

                    <Route path='/login' element={<Loginin />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/logout' element={<LandingComponent />} />

                    <Route path='/problem-solving/*' element={<ProblemSolving/>} />
                 
                    <Route path='/career-resources/*' element={<CareerResources/>} />

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    )
}
