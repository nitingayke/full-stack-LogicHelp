import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function OutputBox({ output, error, handleOutput, isLoading }) {
    return (


        <div className='col-12 col-md-6 position-absolute end-0 landingpage-program-output output-hide p-2 printing-result'>
            <button className='pe-2 bg-transparent border-0' onClick={handleOutput}><CloseIcon className='text-light' /></button>
            <hr />
            {(!output && !error) ? <span>Click 'Run' to see the output here </span> : <div className='px-0 m-0 fs-16 printing-result'>{output}</div>}

            {error && <div className='m-0 p-2 text-danger fs-16 printing-result'>{error}</div>}


            {
                isLoading &&
                <div className="clearfix position-absolute top-50 end-50">
                    <div className="spinner-border float-end"></div>
                </div>
            }

        </div>

    )
}