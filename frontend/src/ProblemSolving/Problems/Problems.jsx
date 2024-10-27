import React from 'react';
import ProblemList from './ProblemList';
import "./Problems.css";

export default function Problems(){
    return (
        <div className='col-12 col-lg-10 col-md-11 mx-auto p-3'>
            <ProblemList />
        </div>
    )
}