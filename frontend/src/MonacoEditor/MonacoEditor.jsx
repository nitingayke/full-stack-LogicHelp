import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from './EditorConstants';
import "./MonacoEditor.css";
import OutputBox from './OutputBox';
import axios from 'axios';
import { executeCode } from './ExecuteCode';


export default function MonacoEditor() {
    const editorRef = useRef("");
    const [value, setValue] = useState(CODE_SNIPPETS['java']);
    const [selectedLanguage, setSelectedLanguage] = useState('java');
    const [backgroundColor, setBackgroundColor] = useState('vs-light');
    const [outputResult, setOutputResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleEditorMount(editor) {
        editorRef.current = editor;
        editor.focus();
    }

    let handleSelectedLanguage = (language) => {
        setSelectedLanguage(language);
        setValue(CODE_SNIPPETS[language]);
    }

    let handleBackgroundColor = () => {
        setBackgroundColor(backgroundColor === 'vs-light' ? 'vs-dark' : 'vs-light');
    }

    let handleOutput = () => {
        document.querySelector(".landingpage-program-output").classList.toggle("output-hide");
    }

    let handleRunCode = async () => {
        if (document.querySelector(".landingpage-program-output").classList.contains("output-hide")) {
            document.querySelector(".landingpage-program-output").classList.remove("output-hide");
        }
        let sourseCode = editorRef.current.getValue();
        if (!sourseCode) return;

        try {
            setIsLoading(true);
            const { run: result } = await executeCode(selectedLanguage, sourseCode);
            if(!result.stderr){
                setOutputResult({ output: result.output.split("\n"), error: "" });
            }else{
                setOutputResult({ output: "", error: result.stderr });
            }
            
        } catch (error) {
            setOutputResult({ output: "", error: (error && error.message) ? error.message : "Unable to run code"});
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <LanguageSelector handleSelectedLanguage={handleSelectedLanguage} selectedLanguage={selectedLanguage} handleBackgroundColor={handleBackgroundColor} handleOutput={handleOutput} handleRunCode={handleRunCode} />
            <div className='d-flex flex-wrap position-relative'>
                <div className='col-12'>
                    <Editor
                        height="70vh"
                        theme={backgroundColor}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        language={selectedLanguage}
                        onMount={handleEditorMount}
                    />
                </div>

                <OutputBox output={(!outputResult || !outputResult.output) ? "" : outputResult.output} error={(!outputResult || !outputResult.error) ? "" : outputResult.error} handleOutput={handleOutput} isLoading={isLoading} />
            </div>
        </div>
    )
}