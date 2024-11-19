import React, { useState, useEffect } from 'react';
import Navbar from './sharedComponent/Navbar';
import Footer from './sharedComponent/Footer';
import { Routes, Route, useNavigate  } from 'react-router-dom';
import HomePage from './HomePage/HomePage.jsx';
import NotFound from './sharedComponent/NotFound.jsx';
import LandingComponent from './LandingComponent/LandingComponent.jsx';
import Login from './UserLogin/Login.jsx';
import Signup from './UserLogin/Signup.jsx';
import ProblemSolving from './ProblemSolving/ProblemSolving.jsx';
import CareerResources from './CareerResources/CareerResources.jsx';
import EditProfile from './UserProfile/EditProfile.jsx';

export default function AppComponent() {
    const [loginUser, setLoginUser] = useState(null);

    const handleLoginUser = (user) => {
        setLoginUser(user);
    }

    return (
        <>
            <Navbar loginUser={loginUser} handleLoginUser={handleLoginUser} />

            <div className='dashboard-components'>
                <Routes>
                    <Route path='/' element={<HomePage loginUser={loginUser} />} />

                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/logout' element={<LandingComponent />} />
                    <Route path='/user/edit-profile/:user' element={<EditProfile loginUser={loginUser}/>} />

                    <Route path='/problem-solving/*' element={<ProblemSolving loginUser={loginUser}/>} />

                    <Route path='/career-resources/*' element={<CareerResources />} />
            
                    <Route path='*' element={<NotFound />} />
                </Routes>

            </div>
            <Footer />
        </>
    )
}
