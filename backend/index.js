require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 9658;

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());


const apiExecute = require("./Routes/API_Execute.js");
app.use("/api", apiExecute);

app.get("*", (req, res) => {
    res.send("Working");
});

app.listen(PORT, () => {
    console.log("app has been listening");
});




