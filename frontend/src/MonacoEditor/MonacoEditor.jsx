import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from './EditorConstants';
import "./MonacoEditor.css";
import OutputBox from './OutputBox';
import axios from "axios";


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
        let sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;

        setOutputResult();

        try {
            setIsLoading(true);

            const response = await axios.post("http://localhost:9658/api/execute-code", {
                language: selectedLanguage,
                sourceCode: sourceCode
            });
            const { run: result } = response.data.run;

            if (result && result.stdout) {
                setOutputResult({ output: result.stdout.split("\n"), error: "" });
            } else if (result && result.stderr) {
                setOutputResult({ output: "", error: result.stderr });
            } else {
                setOutputResult({ output: "", error: "No output or error from code execution." });
            }

        } catch (error) {
            setOutputResult({ output: "", error: (error && error.message) ? error.message : "Unable to run code" });
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
                        height="60vh"
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