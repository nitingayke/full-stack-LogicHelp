import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import "./MonacoEditor.css";

export default function LanguageSelector({ handleSelectedLanguage, selectedLanguage, handleBackgroundColor, handleOutput, handleRunCode }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (language) => {
        handleSelectedLanguage(language);
        handleClose();
    };

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <Button
                    id="fade-button"
                    className="text-light header-buttom header-button-bg "
                    onClick={handleClick}>
                    {selectedLanguage}
                </Button>

                <div className='d-flex'>
                    
                    <Button variant="contained" className="header-buttom me-2 bg-green" onClick={handleRunCode}><PlayCircleOutlineIcon className='fs-5 me-1'/>Run</Button>
                    <Button variant="contained" className="header-buttom header-button-bg me-2 d-none d-md-block" onClick={handleOutput}>Console</Button>
                    <Button variant="contained" className="header-buttom header-button-bg " onClick={handleBackgroundColor}>Change Theme</Button>
                </div>
            </div>
            <Menu
                id="fade-menu"
                MenuListProps={{ 'aria-labelledby': 'fade-button' }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={() => handleLanguageChange('c')}>C</MenuItem>
                <MenuItem onClick={() => handleLanguageChange('cpp')}>C++</MenuItem>
                <MenuItem onClick={() => handleLanguageChange('java')}>Java</MenuItem>
                <MenuItem onClick={() => handleLanguageChange('javascript')}>JavaScript</MenuItem>
                <MenuItem onClick={() => handleLanguageChange('php')}>PHP</MenuItem>
                <MenuItem onClick={() => handleLanguageChange('python')}>Python</MenuItem>
                <MenuItem onClick={() => handleLanguageChange('typescript')}>TypeScript</MenuItem>
            </Menu>
        </div>
    );
}
