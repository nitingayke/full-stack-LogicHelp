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
        origin: ["https://logichelp.onrender.com", "http://localhost:3000"],
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
        console.error("Error in establishing connection:", error.message);
    });

const io = new Server(server, {
    cors: {
        origin: ["https://logichelp.onrender.com", "http://localhost:3000"],
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
                doubt_id
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

            io.emit("doubt-solved", { status: true, doubt_id });
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
                select: 'username country _id image',
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
            user.userProgress.coins += 5;
            await user.save();

            await challenge.save();

            result.user = {
                username: user.username,
                _id: user._id,
                image: user.image,
                country: user.country,
            }

            io.emit('live-challenge-results-success', { result, challenge_id });
        } catch (error) {
            socket.emit('error', { message: "unable to add user solution." });
        }
    });

    socket.on('delete-user-doubt', async (data) => {
        try {
            const { doubt_id } = data;

            if (!doubt_id) {
                return socket.emit('error', { message: 'doubt id not found.' });
            }
            const deletedDoubt = await Doubt.findByIdAndDelete(doubt_id);
            if (!deletedDoubt) {
                return socket.emit('error', { message: 'Doubt not found or already deleted.' });
            }
            io.emit('deleted-doubt', { doubt_id });
        } catch (error) {
            socket.emit('error', { message: "unable to delete user doubt." });
        }
    });

    socket.on('edit-user-doubt', async (data) => {

        const { doubt_id, title, message } = data;
        try {
            if (!doubt_id || !title || !message) {
                return socket.emit('error', { message: 'Missing required fields.' });
            }

            let currDoubt = await Doubt.findByIdAndUpdate(
                doubt_id,
                { title, message },
                { new: true }
            ).populate({
                path: 'user',
                select: 'username _id image'
            }).populate({
                path: 'comments.user',
                select: 'username _id image'
            });

            io.emit('edited-user-doubt', { currDoubt });
        } catch (error) {
            socket.emit('error', { message: "unable to update route." });
        }
    });

    socket.on('delete-doubt-comment', async (data) => {
        const { comment_id, doubt_id } = data;

        try {
            if (!comment_id || !doubt_id) {
                return socket.emit('error', { message: 'Missing required fields.' });
            }

            const updatedDoubt = await Doubt.findOneAndUpdate(
                { _id: doubt_id, 'comments._id': comment_id },
                { $pull: { comments: { _id: comment_id } } },
                { new: true }
            );

            if (!updatedDoubt) {
                socket.emit("error", { message: "Doubt or comment not found" });
                return;
            }

            io.emit("doubt-comment-deleted", { doubt_id, comment_id });
        } catch (error) {
            socket.emit("error", { message: "Error deleting doubt comment" });
        }
    });

    socket.on('edit-doubt-comment', async (data) => {
        const { doubt_id, comment_id, message: newMessage } = data;

        try {
            if (!doubt_id || !comment_id || !newMessage) {
                return socket.emit('error', { message: 'Missing required fields.' });
            }

            let updatedDoubt = await Doubt.findOneAndUpdate(
                { _id: doubt_id, 'comments._id': comment_id },
                {
                    $set: {
                        'comments.$.message': newMessage
                    }
                },
                { new: true }
            );

            if (!updatedDoubt) {
                return socket.emit("error", { message: "Doubt or comment not found" });
            }

            io.emit('edited-doubt-comment', { newMessage, doubt_id, comment_id });
        } catch (error) {
            socket.emit("error", { message: "Error editing doubt comment" });
        }
    });

    socket.on('edit-live-stream-comment', async (data) => {
        try {
            const { comment_id, message } = data;
            if (!comment_id || !message) {
                socket.emit('error', { message: 'Missing required fields.' });
                return;
            }

            const response = await LiveStream.findOneAndUpdate(
                { _id: comment_id },
                { $set: { message } },
                { new: true }
            );

            if (!response) {
                socket.emit('error', { message: 'Comment not found.' });
                return;
            }

            io.emit('edited-live-stream-comment', { comment_id, message });
        } catch (error) {
            socket.emit('error', { message: `Failed to edit comment: ${error.message}` });
        }
    });

    socket.on('delete-live-stream-comment', async (data) => {
        try {
            const { comment_id } = data;
            if (!comment_id) {
                socket.emit('error', { message: 'Missing required fields.' });
                return;
            }

            await LiveStream.findByIdAndDelete(comment_id);
            io.emit('deleted-live-stream-comment', { comment_id });
        } catch (error) {
            socket.emit('error', { message: `Failed to delete comment: ${error.message}` });
        }
    });

    socket.on('edit-live-challenge', async (data) => {
        try {
            const { challenge_id, title, textMessage, imageURL } = data;

            if (!challenge_id) {
                socket.emit('error', { message: 'Challenge ID is required.' });
                return;
            }

            const updateFields = {};
            if (title) updateFields.title = title;
            if (textMessage) updateFields.textMessage = textMessage;
            if (imageURL !== undefined) updateFields.imageURL = imageURL;

            const editedChallenge = await LiveChallenge.findOneAndUpdate(
                { _id: challenge_id },
                { $set: updateFields },
                { new: true },
            )

            if (!editedChallenge) {
                socket.emit('error', { message: 'Live Challenge not found.' });
                return;
            }

            io.emit('edited-live-challenge', {
                challenge_id,
                title: editedChallenge.title,
                textMessage: editedChallenge.textMessage,
                imageURL: editedChallenge.imageURL,
            });
        } catch (error) {
            socket.emit('error', { message: `Failed to edit challenge: ${error.message}` });
        }
    });

    socket.on('delete-selected-challenge', async (data) => {

        try {
            const { challenge_id } = data;

            if (!challenge_id) {
                socket.emit('error', { message: 'Challenge ID is required.' });
                return;
            }

            const result = await LiveChallenge.findByIdAndDelete(challenge_id);

            if (!result) {
                socket.emit('error', { message: 'Challenge does not found.' });
                return;
            }

            io.emit('deleted-selected-challenge', { challenge_id });
        } catch (error) {
            socket.emit('error', { message: `Failed to delete challenge: ${error.message}` });
        }
    });

    socket.on('delete-selected-challenge-comment', async (data) => {
        const { challenge_id, comment_id, user_id } = data;

        if (!challenge_id || !comment_id) {
            socket.emit('error', { message: 'Challenge ID and Comment ID are required.' });
            return;
        }

        try {

            const updatedChallenge = await LiveChallenge.findOneAndUpdate(
                { _id: challenge_id },
                { $pull: { result: { _id: comment_id } } },
                { new: true }
            );

            if (!updatedChallenge) {
                socket.emit('error', { message: 'Challenge not found.' });
                return;
            }

            const currUser = await User.findById(user_id);
            currUser.userProgress.coins -= 5;
            await currUser.save();

            io.emit('deleted-selected-challenge-comment', { challenge_id, comment_id });
        } catch (error) {
            socket.emit('error', { message: `Failed to delete comment: ${error.message}` });
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
const path = require("path");
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
