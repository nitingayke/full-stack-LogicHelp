const express = require("express");
const router = express.Router();
const axios = require("axios");

const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    python: "3.10.0",
    php: "8.2.3",
    c: "11.2.0",
    cpp: "11.2.0",
    java: "15.0.2",
    typescript: "5.0.3",
};

const executeCode = async (language, sourceCode) => {
    try {
        const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
            language: language,
            version: LANGUAGE_VERSIONS[language],
            files: [
                {
                    content: sourceCode,
                },
            ],
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

router.post("/execute-code", async (req, res) => {
    const { language, sourceCode } = req.body;

    if (!language || !sourceCode) {
        return res.status(400).json({ error: "Missing required fields: language or sourceCode" });
    }

    try {
        const result = await executeCode(language, sourceCode);
        res.json({ run: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
