import React from 'react';
import "./SharedComponent.css"

import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    return (
        <footer className='mb-0 dashboard-footer'>
            <div className='col-md-10 mx-auto d-flex flex-wrap justify-content-between'>
                <p className='mb-0 py-3'>&copy; 2024 LogicHelp. All rights reserved.</p>

                <div className='d-flex'>
                    <ul className='d-flex list-unstyled align-items-center mb-0 fs-16'>
                        <li className='px-1'><a href="/about" className='footer-link'>About Us</a></li>
                        <li className='px-1'><a href="/privacy" className='footer-link'>Privacy Policy</a></li>
                        <li className='px-1'><a href="/terms" className='footer-link'>Terms of Service</a></li>

                        <li className='ps-1'><a href='https://linkedin.com/in/nitin-gayke92' ><LinkedInIcon className='fs-6'/> </a></li>
                        <li className='ps-1'><a href='https://github.com/nitingayke' ><GitHubIcon className='fs-6'/> </a></li>
                        <li className='ps-1'><a href='/telegram' ><TelegramIcon className='fs-6'/> </a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}