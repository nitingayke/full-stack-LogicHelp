import React from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ sourceCode, language, handleSourceCode, handleEditorMount }) {

    return (
        <Editor
            height="80vh"
            theme="vs-dark"
            value={sourceCode}
            language={language}
            onChange={handleSourceCode}
            onMount={handleEditorMount}
        />
    )
}
