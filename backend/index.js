const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("./Models/UserModel.js");
const Doubt = require("./Models/DoubtModel.js");
const LiveStream = require("./Models/LiveStream.js");
const LiveChallenge = require("./Models/LiveChallenge.js");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const { MONGO_URL, PORT } = process.env;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);


mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("MongoDB is connected successfully");
    })
    .catch((error) => {
        console.error("Error in establishing connection:", error);
    });

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    },
});

io.on("connection", (socket) => {

    console.log('a user connected');

    socket.on("new-comment", async (data) => {

        try {
            const { doubt_id, user_id, message } = data;
            if (!doubt_id || !user_id || !message) {
                return socket.emit('error', { message: 'Missing required fields.' });
            }

            const currUser = await User.findById(user_id);
            const currDoubt = await Doubt.findById(doubt_id);

            if (!currUser || !currDoubt) {
                return socket.emit('error', { message: 'User or doubt not found.' });
            }

            const newComment = {
                user: user_id,
                message,
                createdAt: new Date(),
            };

            currDoubt.comments.push(newComment);
            await currDoubt.save();


            newComment.user = {
                country: currUser.country,
                username: currUser.username,
                image: currUser.image,
                _id: user_id,
            }

            io.emit("update-comments", { newComment });
        } catch (error) {
            socket.emit("error", { message: "Unable to add comment at this time." });
        }
    });

    socket.on("solved-doubt", async (data) => {
        try {
            const { doubt_id } = data;

            if (!doubt_id) {
                return socket.emit('error', { message: 'Missing required fields.' });
            }

            await Doubt.findByIdAndUpdate(
                doubt_id,
                { isSolve: true },
                { new: true }
            );

            io.emit("doubt-solved", { status: true });
        } catch (error) {
            socket.emit("error", { message: "unable to mark solve doubt." });
        }
    });

    socket.on('create-new-doubt', async (data) => {
        try {
            const { title, message, tag, user_id } = data;

            if (!title || !message || !tag || !user_id) {
                return socket.emit('error', { message: 'Missing required fields.' });
            }

            const currUser = await User.findById(user_id);
            if (!currUser) {
                return socket.emit('error', { message: 'User not found.' });
            }

            const newDoubt = new Doubt({
                user: user_id,
                title,
                message,
                tag,
                comments: [],
            });

            currUser.userProgress.coins += 5;
            await currUser.save();

            await newDoubt.save();
            await newDoubt.populate({
                path: 'user',
                select: 'username country _id',
            });

            io.emit("added-new-doubt", { newDoubt });
        } catch (error) {
            socket.emit("error", { message: "unable to create new doubt" });
        }
    });

    socket.on('livestream-message', async (data) => {
        try {
            const { user_id, message } = data;
            if (!user_id || !message) {
                return socket.emit('error', { message: 'missing user id and message.' });
            }

            const currUser = await User.findById(user_id);
            if (!currUser) {
                return socket.emit('error', { message: 'user not found.' });
            }

            const newMessage = new LiveStream({
                user: user_id,
                message,
            });

            await newMessage.save();

            await newMessage.populate({
                path: 'user',
                select: 'username country _id image',
            });

            io.emit("added-livestream-message", { newMessage });
        } catch (error) {
            socket.emit("error", { message: "unable to add live stream message" });
        }
    });

    socket.on('create-new-live-challenge', async (data) => {
        try {
            const { title, message, imageURL, tag, user_id } = data;

            if (!title || !message || !tag || !user_id) {
                return socket.emit('error', { message: 'missing title, message and tag.' });
            }

            const currUser = await User.findById(user_id);
            if (!currUser) {
                return socket.emit('error', { message: 'user not found.' });
            }

            const newChallenge = new LiveChallenge({
                user: user_id,
                title,
                textMessage: message,
                tag,
                imageURL
            });

            currUser.userProgress.coins += 10;
            await currUser.save();
            await newChallenge.save();
     
            await newChallenge.populate({
                path: 'user',
                select: 'username country _id image',
            });

            io.emit('created-new-live-challenge', { newChallenge });

        } catch (error) {
            socket.emit("error", { message: "unable to create new live challenge." });
        }
    });

    socket.on('live-challenge-results', async (data) => {
        try {
            const { user_id, challenge_id, challengeSolution, projectDeployLink } = data;

            if (!user_id || !challenge_id || !challengeSolution) {
                return socket.emit('error', { message: 'Missing required fields.' });
            }

            const user = await User.findById(user_id);
            const challenge = await LiveChallenge.findById(challenge_id);
    
            if (!user || !challenge) {
                return socket.emit('error', { message: 'User or challenge not found.' });
            }

            const result = {
                user: user_id,
                message: challengeSolution,
                deployLink: projectDeployLink,
                createdAt: new Date(),
            }
            challenge.result.push(result);
            user.userProgress.coins += 7;
            await user.save();
            
            await challenge.save();

            result.user = {
                username: user.username,
                _id: user._id,
                image: user.image,
                country: user.country
            }

            io.emit('live-challenge-results-success', { result });
        } catch (error) {
            socket.emit('error', { message: "unable to add user solution." });
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected`);
    });
});

app.set("io", io);

const authRoute = require("./Routes/AuthRoute.js");
app.use("/", authRoute);

const apiExecute = require("./Routes/API_ExecuteRoute.js");
app.use("/api", apiExecute);

const questions = require("./Routes/QuestionsRoute.js");
app.use("/questions", questions);

const userData = require("./Routes/UserRoute.js");
app.use("/user", userData);

const contestsData = require("./Routes/ContestsRoute.js");
app.use("/contest", contestsData);

const userDoubts = require("./Routes/DoubtsRoute.js");
app.use("/doubts", userDoubts);

app.get("*", (req, res) => {
    return res.send("Working");
});

app.use((err, req, res, next) => {
    const { errorCode = 505, message = "Something Went Wrong" } = err;
    return res.status(errorCode).json({
        error: {
            message,
            code: errorCode,
        },
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
