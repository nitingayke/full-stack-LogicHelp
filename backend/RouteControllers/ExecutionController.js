const axios = require("axios");
const OpenAI = require('openai');
const Course = require('../Models/CourseModel.js');
const { YOUTUBE_DATA_API_KEY, OPEN_AI_API_KEY, AZURA_JOB_ID, AZURA_JOB_API_KEY } = process.env;

const openai = new OpenAI({ apiKey: OPEN_AI_API_KEY })

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

module.exports.codeExecution = async (req, res) => {
    const { language, sourceCode } = req.body;

    if (!language || !sourceCode) {
        return res.status(400).json({ error: "Missing required fields: language or sourceCode" });
    }

    const result = await executeCode(language, sourceCode);
    return res.json({ run: result });
}


const getYoutubeVideos = async (query) => {
    const baseUrl = "https://www.googleapis.com/youtube/v3/search";
    const params = new URLSearchParams({
        part: "snippet",
        type: "video",
        q: query,
        key: YOUTUBE_DATA_API_KEY, // Ensure this key is stored securely
        maxResults: 1,
        order: "viewCount",
    });

    try {
        const response = await fetch(`${baseUrl}?${params.toString()}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch YouTube videos: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.items || data.items.length === 0) {
            throw new Error("No videos found.");
        }

        return data.items;
    } catch (error) {
        return null;
    }
};

module.exports.youtubeVideo = async (req, res) => {

    const query = `${req.body.searchQuery} solution`;

    const result = await getYoutubeVideos(query);
    if (result && result.length > 0) {
        return res.json(result);
    } else {
        return res.status(404).json({ message: "No videos found matching the query." });
    }
}

module.exports.executeUserBug = async (req, res) => {
    const { userDoubt } = req.body;

    if (!userDoubt) {
        return res.status(400).json({ error: "userDoubt is required." });
    }

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: 'user', content: `Please can you resolve this doubt:\n\n${userDoubt}` }
        ],
    });

    const api_response = completion.choices[0].message;

    if (!api_response) {
        return res.status(500).json({ error: "No response from OpenAI API." });
    }

    return res.json({ response: api_response });
}

module.exports.postedIT_Jobs = async (req, res) => {

    const { query = 'Software Engineer Jobs', location = 'India' } = req.body;

    const result = await axios.get('https://api.adzuna.com/v1/api/jobs/us/search/1', {
        params: {
            app_id: AZURA_JOB_ID,
            app_key: AZURA_JOB_API_KEY,
            what: query,
            where: location,
        }
    });

    const jobs = result.data.results;
    res.json({ jobs });
}

const topics = [
    "DSA",
    "SQL",
    "Java",
    "C++",
    "C",
    "JavaScript",
    "Python",
    "Web Development",
    "Open Source",
    "Machine Learning",
];

module.exports.studyCourses = async (req, res) => {

    const today = new Date();
    const day = today.getDate();

    const totalCourses = await Course.find({});
    if (day % 28 !== 0) {
        return res.json({ totalCourses });
    }

    const allCourses = [];
    for (const topic of topics) {
        const course = await getYoutubeVideos(`${topic} Course`);

        if (course[0]?.snippet && course[0].id?.videoId) {
            allCourses.push(course[0]);
        }
    }

    const coursesToSave = allCourses.map(course => {
        const videoId = course?.id?.videoId;
        const title = course?.snippet?.title;
        const description = course?.snippet?.description;
        const publishedAt = course?.snippet?.publishedAt;
        const thumbnailUrl = course?.snippet?.thumbnails?.medium?.url;

        if (videoId && title && thumbnailUrl) {
            return {
                video: { videoId },
                snippet: {
                    title,
                    description,
                    publishedAt,
                    thumbnails: {
                        medium: { url: thumbnailUrl },
                    },
                },
            };
        }
    }).filter(Boolean);

    if (coursesToSave.length > 0) {
        await Course.deleteMany();
        await Course.insertMany(coursesToSave);
    }

    return res.json({
        totalCourses: coursesToSave.length > 0 ? coursesToSave : totalCourses,
    });
}

