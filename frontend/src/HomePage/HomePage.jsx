import React from 'react';
import ProductCard from './ProductCard';
import "./HomePage.css";
import UserProfile from '../UserProfile/UserProfile';

export default function HomePage() {
    return (
        <div className='col-12 col-md-10 mx-auto px-2 px-md-0'>

            <div className='d-flex flex-wrap'>
                <ProductCard />
                <div className='col-12 col-md-7'>
                    <UserProfile />
                </div>
            </div>

        </div>
    )
}