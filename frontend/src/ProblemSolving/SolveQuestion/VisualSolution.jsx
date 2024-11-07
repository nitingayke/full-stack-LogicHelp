import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function VisualSolution({ query, language }) {

    const [videoSolution, setVideoSolution] = useState(null);
    const [sourceCode, setSourceCode] = useState("");


    useEffect(() => {
        const fetchVideoSolution = async () => {
            const response = await axios.post("http://localhost:9658/api/youtube-video", {
                searchQuery: query
            });
            
            if (response.data && response.data.length > 0) {
                setVideoSolution(response.data[0]);
            } else {
                setVideoSolution(null);
            }
        }

        if (query) {
            fetchVideoSolution();
        }
    }, [query]);

    return (
        <>
            <div className='py-2 text-center border-bottom border-secondary mb-1'>
                {(!videoSolution?.id?.videoId) ? <p className='fs-16 text-danger opacity-75'>Does not contains Video Explanation.</p> :
                    <iframe
                        src={`https://www.youtube.com/embed/${videoSolution.id.videoId}`}
                        width={"100%"}
                        height="315"
                        title={videoSolution.snippet.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>}
            </div>

            <div className='py-3'>
                <h5 className='m-0 fw-semibold opacity-50 py-2'>Source Code: </h5>
                {(!sourceCode) ? <div className='col-12 border border-warning rounded px-2 py-3 fs-16 text-warning bg-light-gold'>
                    <p className='fs-4 fw-semibold m-0'><ErrorOutlineOutlinedIcon className='fs-3 mb-1 me-2' />We couldn't find a solution for this problem,</p>
                    <span className='pt-2'>but remember, the best solutions come from great questions!</span>
                </div> :
                    <div>
                        <SyntaxHighlighter language={language} style={ solarizedlight } >{sourceCode}</SyntaxHighlighter>
                    </div>
                }
            </div>

        </>
    )
}