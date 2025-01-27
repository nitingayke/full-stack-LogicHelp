const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketRouteController = require("./RouteControllers/SocketRouter.js");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const { MONGO_URL, PORT } = process.env;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["https://logichelp.onrender.com", "http://localhost:3000", "https://logic-help.vercel.app"],
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

    socketRouteController(io, socket);

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
