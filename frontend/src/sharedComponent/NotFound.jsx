import React from 'react';

export default function NotFound(){
    return (
        <div className="not-found col-12 col-md-10 mx-auto py-3 px-2">
            <h2 className='fs-1 fw-bold text-danger'>404</h2> 
            <h2 className='fs-1 fw-bold'>Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist...</p>
        </div>
    )
}