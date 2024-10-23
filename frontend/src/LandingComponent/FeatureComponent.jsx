import React from 'react';

export default function FeatureComponent({ description, imgURL }) {
    return (
        <div className='d-flex flex-wrap align-items-center justify-content-between feature-data'>
            <p className='col-md-6 p-3 m-0'>&nbsp;&nbsp;&nbsp;&nbsp;{ description }</p>
            <img src={imgURL} className='img-fluid col-md-5 p-3 col-12' alt="" />
        </div>
    )
}