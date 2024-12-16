import React, { useEffect, useState } from 'react';
import Navbar from './sharedComponent/Navbar';
import Footer from './sharedComponent/Footer';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage.jsx';
import NotFound from './sharedComponent/NotFound.jsx';
import LandingComponent from './LandingComponent/LandingComponent.jsx';
import Login from './UserLogin/Login.jsx';
import Signup from './UserLogin/Signup.jsx';
import ProblemSolving from './ProblemSolving/ProblemSolving.jsx';
import CareerResources from './CareerResources/CareerResources.jsx';
import EditProfile from './UserProfile/EditProfile.jsx';
import WatchProfile from './UserProfile/WatchProfile.jsx';
import { ToastContainer, toast } from 'react-toastify';

import { io } from 'socket.io-client';
const socket = io('https://logichelp-backend.onrender.com');


export default function AppComponent() {
    const [loginUser, setLoginUser] = useState(null);

    const handleLoginUser = (user) => {
        setLoginUser(user);
    }

    useEffect(() => {
        const errorHandler = (errorData) => {
            toast.error(errorData.message);
        };

        socket.on('error', errorHandler);

        return () => {
            socket.off('error', errorHandler);
        };
    }, []);

    return (
        <>
            <Navbar loginUser={loginUser} handleLoginUser={handleLoginUser} />

            <div className='dashboard-components'>
                <Routes>
                    <Route path='/' element={<HomePage />} />

                    <Route path='/login' element={<Login handleLoginUser={handleLoginUser} />} />
                    <Route path='/signup' element={<Signup handleLoginUser={handleLoginUser} />} />
                    <Route path='/logout' element={<LandingComponent />} />

                    <Route path='user-profile/:id' element={<WatchProfile loginUser={loginUser} />} />

                    <Route path='/user/edit-profile/:user' element={<EditProfile loginUser={loginUser} />} />

                    <Route path='/problem-solving/*' element={<ProblemSolving loginUser={loginUser} />} />

                    <Route path='/career-resources/*' element={<CareerResources loginUser={loginUser} />} />

                    <Route path='*' element={<NotFound />} />
                </Routes>

            </div>
            <Footer loginUser={loginUser} />

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}
