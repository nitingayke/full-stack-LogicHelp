const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { MONGO_URL, PORT } = process.env;

app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("MongoDB is  connected successfully");
    }).catch((error) => {
        console.log("error in establishing connection" + error);
    })

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

const authRoute = require("./Routes/AuthRoute.js");
app.use("/", authRoute);

const apiExecute = require("./Routes/API_ExecuteRoute.js");
app.use("/api", apiExecute);

const questions = require("./Routes/QuestionsRoute.js");
app.use("/questions", questions);


app.get("*", (req, res) => {
    return res.send("Working");
});

app.use((err, req, res, next) => {
        
    const { errorCode = 505, message = "Something Went Wrong" } = err;
    return res.status(errorCode).json({
        error: {
            message: message,
            code: errorCode,
        },
    });
});


app.listen(PORT, () => {
    console.log("app has been listening");
});




