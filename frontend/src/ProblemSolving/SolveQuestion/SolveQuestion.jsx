import React, { useState, useEffect, useRef } from 'react';
import ProblemDescription from './ProblemDescription';
import { useParams } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined';
import { CODE_SNIPPETS } from '../../MonacoEditor/EditorConstants';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import axios from "axios";
import VisualSolution from './VisualSolution';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SolveQuestion({ loginUser }) {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        let timer;
        if (isActive) {
            timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isActive]);

    const toggleStopwatch = () => {
        setIsActive(!isActive);
        if (!isActive) {
            setSeconds(0);
        }
    };

    const formatTime = (secs) => {
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor((secs % 3600) / 60);
        const seconds = secs % 60;
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    const [language, setLanguage] = useState('java');
    const [sourceCode, setSourceCode] = useState(CODE_SNIPPETS['java']);
    const [isRun, setIsRun] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const editorRef = useRef(null);
    const [outputResult, setOutputResult] = useState({ output: [], error: "" });
    const [selectedComponent, setSelectedComponent] = useState("description-component");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenAlert, setIsOpenAlert] = useState(false);

    const { id } = useParams();
    useEffect(() => {
        const featchQuestion = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`https://loginhelp-backend.onrender.com/questions/get-question/${id}`);
                if (res.data) {
                    setProblem(res.data);
                } else {
                    setProblem(null);
                }
            } catch (error) {
                setProblem(null);
            } finally {
                setIsLoading(false);
            }
        };
        featchQuestion();
    }, [id]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (language) => {
        setLanguage(language);
        setSourceCode(CODE_SNIPPETS[language]);
        handleClose();
    };

    const handleSourceCode = (newValue) => {
        setSourceCode(newValue);
    }

    const handleOutputBox = (e) => {
        document.querySelector(".problem-output-box ").classList.toggle("increase-output-box-height");
    }

    function handleEditorMount(editor) {
        editorRef.current = editor;
        editor.focus();
    }

    const handleComponentButton = (id) => {
        if (id === selectedComponent) return;

        document.getElementById(selectedComponent).classList.add("d-none");
        document.getElementById(id).classList.remove("d-none");
        setSelectedComponent(id);
    }

    const handleRunButton = async () => {
        let sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        setOutputResult({ output: [], error: "" });
        if (!document.querySelector(".problem-output-box ").classList.contains("increase-output-box-height")) {
            document.querySelector(".problem-output-box ").classList.add("increase-output-box-height");
        }

        try {
            setIsRun(true);
            const response = await axios.post("https://loginhelp-backend.onrender.com/api/execute-code", {
                language: language,
                sourceCode: sourceCode
            });

            const { run: result } = response.data.run;

            if (result?.stdout) {
                setOutputResult({ output: result.stdout.split("\n"), error: "" });
            } else if (result?.stderr) {
                setOutputResult({ output: "", error: result.stderr });
            } else {
                setOutputResult({ output: "", error: "No output or error from code execution." });
            }

        } catch (error) {
            setOutputResult({ output: "", error: (error && error.message) ? error.message : "Unable to run code" });
        } finally {
            setIsRun(false);
        }
    }

    const handleSubmitButton = async () => {
        setIsOpenAlert(false);
        
        if(!loginUser?._id){
            toast.error("You must be logged in to submit a problem.");
            return ;
        }
        
        let sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        setOutputResult({ output: "", error: "" });
        if (!document.querySelector(".problem-output-box ").classList.contains("increase-output-box-height")) {
            document.querySelector(".problem-output-box ").classList.add("increase-output-box-height");
        }

        try {
            setIsSubmit(true);

            const response = await axios.post("https://loginhelp-backend.onrender.com/api/execute-code", {
                language: language,
                sourceCode: sourceCode
            });

            const { run: result } = response.data.run;

            if (result?.stdout) {
                
                const submitRes = await axios.put(`https://loginhelp-backend.onrender.com/questions/submit-code/${problem._id}/user/${loginUser._id}/language/${language}`);
                
                if (!submitRes.data.success) {
                    setOutputResult({ output: "", error: "Unable to update data in your profile." });
                } else {
                    setOutputResult({ output: ["Problem solution submitted successfully."], error: "" });
                }

            } else if (result?.stderr) {
                setOutputResult({ output: "", error: result.stderr });
            } else {
                setOutputResult({ output: "", error: "Does not have print statemt to print output or error from code execution." });
            }
        } catch (error) {
            setOutputResult({ output: "", error: (error && error.message) ? error.message : "Unable to submit code" });
        } finally {
            setIsSubmit(false);
        }
    }

    return (
        <>
            {(isLoading || !problem) ? (<div className='col-12 h-100 d-flex py-5 mt-5 justify-content-center text-secondary'>
                <div className="spinner-border text-light " role="status"></div>
                <span className='ps-2 text-light'>Loading...</span>
            </div>) :
                (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100vh',
                            zIndex: 5000,
                            display: 'flex',
                            flexWrap: 'wrap',
                            backgroundColor: '#131313',
                            overflow: 'auto'
                        }}

                    >
                        <div className='col-12 col-lg-5 h-100 overflow-auto hide-scrollbar bg-dark-gray'>

                            <ul
                                className='d-flex m-0 p-2 list-unstyled border-bottom border-secondary fs-16 overflow-auto hide-scrollbar bg-dark-gray'
                                style={{ position: 'sticky', top: 0, zIndex: 1000 }} // Add sticky position
                            >
                                <li className='me-2'>
                                    <button
                                        type='button'
                                        className='d-flex align-items-center bg-light-black border-0 py-1 px-2 rounded text-light-secondary'
                                        onClick={() => handleComponentButton("description-component")}
                                    >
                                        <DescriptionOutlinedIcon className='fs-6 me-1 text-success' />Description
                                    </button>
                                </li>
                                <li className='me-2'>
                                    <button
                                        type='button'
                                        className='d-flex align-items-center bg-light-black border-0 py-1 px-2 rounded text-light-secondary'
                                        onClick={() => handleComponentButton("visual-solutions-component")}
                                    >
                                        <MenuBookOutlinedIcon className='fs-6 me-1 text-info' />Visual Solutions
                                    </button>
                                </li>
                            </ul>

                            <div id='description-component' className='p-2 pt-0'><ProblemDescription problem={ problem } loginUser={loginUser} /></div>
                            <div className='d-none p-2' id='visual-solutions-component'><VisualSolution query={problem?.title} language={language} /></div>

                        </div>
                        <div className='col-12 col-lg-7 ps-0 ps-lg-1'>
                            <div className='bg-dark-gray px-2 pb-3 h-100'>

                                <ul className='d-flex justify-content-between m-0 py-2 list-unstyled fs-16 overflow-auto hide-scrollbar'>
                                    <li className='me-3'>
                                        <Button
                                            id="fade-button"
                                            className="text-light p-1"
                                            onClick={handleClick}>
                                            <CodeOutlinedIcon className='p-1 text-aqua' />{language}
                                        </Button>
                                        <Menu
                                            id="fade-menu"
                                            MenuListProps={{ 'aria-labelledby': 'fade-button' }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            TransitionComponent={Fade}
                                            style={{ zIndex: 5000 }}
                                        >
                                            <MenuItem onClick={() => handleLanguageChange('c')}>C</MenuItem>
                                            <MenuItem onClick={() => handleLanguageChange('cpp')}>C++</MenuItem>
                                            <MenuItem onClick={() => handleLanguageChange('java')}>Java</MenuItem>
                                            <MenuItem onClick={() => handleLanguageChange('javascript')}>JavaScript</MenuItem>
                                            <MenuItem onClick={() => handleLanguageChange('php')}>PHP</MenuItem>
                                            <MenuItem onClick={() => handleLanguageChange('python')}>Python</MenuItem>
                                            <MenuItem onClick={() => handleLanguageChange('typescript')}>TypeScript</MenuItem>
                                        </Menu>
                                    </li>
                                    <li className="btn-group btn-group-sm me-3" aria-label="Small button group">
                                        <button type="button" className="btn bg-light-black text-light hover-component" onClick={handleRunButton}>
                                            {isRun ? <div className="spinner-border spinner-border-sm me-2 opacity-50" role="status"></div> : <PlayArrowIcon className='pe-1 pb-1' />}Run
                                        </button>
                                        <button type="button" className="btn bg-light-black color-green hover-component" onClick={() => setIsOpenAlert(true)}>
                                            {
                                                isSubmit ?
                                                    <div className="spinner-border spinner-border-sm me-2 opacity-50" role="status"></div>
                                                    : <BackupOutlinedIcon className='pe-1 pb-1' />
                                            }Submit
                                        </button>
                                    </li>
                                    <li className='me-3'>
                                        <button type='button' className='text-light d-flex align-items-center bg-light-black border border-secondary rounded p-1 hover-component' onClick={toggleStopwatch}><AlarmOnOutlinedIcon className='p-1' />{isActive && formatTime(seconds)}</button>
                                    </li>
                                </ul>

                                <div className='position-relative flex-1'>

                                    <CodeEditor sourceCode={sourceCode} language={language} handleSourceCode={handleSourceCode} handleEditorMount={handleEditorMount} />

                                    <div className='position-absolute bottom-0 problem-output-box col-12 border-top border-secondary overflow-hidden'>
                                        <button type='button' onClick={handleOutputBox} className='col-12 bg-dark-gray py-2 fs-6 fw-bold border-0 text-white d-flex justify-content-center'><TouchAppIcon className='fs-5' />Output: </button>
                                        <div className='p-2 fs-16 h-100 overflow-auto'>
                                            {(outputResult?.output || []).map((line, index) => (<p key={index} className='m-0'>{line}</p>))}
                                            {outputResult.error && <p className='text-danger'>{outputResult.error}</p>}

                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                )
            }

            <Dialog
                open={isOpenAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setIsOpenAlert(false)}
                aria-describedby="alert-dialog-slide-description"
                sx={{ zIndex: 5000 }}
            >
                <DialogTitle className='bg-dark-gray text-danger'>{"Are you sure your code will pass all test cases?"}</DialogTitle>
                <DialogContent className='bg-dark-gray'>
                    <DialogContentText className='text-light' id="alert-dialog-slide-description">
                    Please make sure your code works correctly for all test cases. If any test case fails, we will take necessary action to address the issue.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='bg-dark-gray'>
                    <Button  variant="outlined" onClick={() => setIsOpenAlert(false)}>Disagree</Button>
                    <Button  variant="outlined" className='color-green border-success' onClick={() => handleSubmitButton()}>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}