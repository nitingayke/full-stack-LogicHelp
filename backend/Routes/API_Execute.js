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

router.post("/youtube-video", async (req, res) => {

    const query = `DSA Question Solution ${ req.body.searchQuery } code-with-mike`;
    const API_KEY = process.env.YOUTUBE_DATA_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${API_KEY}&maxResults=1&order=viewCount`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.items.length > 0) {
            res.json(data.items);
        } else {
            res.status(204).json({ message: "No videos found matching the query." });
        }
    } catch (error) {
        res.status(500).json({ message: "Sorry! Unable to fetch video explanations." });
    }
});

module.exports = router;
