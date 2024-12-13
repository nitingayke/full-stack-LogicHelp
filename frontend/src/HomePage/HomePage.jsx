import React from 'react';
import ProductCard from './ProductCard';
import "./HomePage.css";

export default function HomePage({ loginUser }) {
    return (
        <div className='col-12 col-md-10 mx-auto px-2 px-md-0 py-4'>
            <ProductCard />
        </div>
    )
}