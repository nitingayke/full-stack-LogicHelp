require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("./Questions.js");
const User = require("./UserModel.js");
const PastContests = require("./PastContest.js");

const mongo_url = "mongodb+srv://gaykenitin975:OGQvJJ8gJmyIq7iy@cluster0.aby67.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongo_url)
    .then((res) => {
        console.log("Connection Establish successfully");
    }).catch((error) => {
        console.log(error);
    });

const questions = [
    {
        questionNo: 5,
        title: "Longest Palindromic Substring",
        // image: "https://assets.leetcode.com/uploads/2020/10/02/addtwonumber1.jpg",
        description: [
            "Given a string s, return the longest palindromic substring in s.", ""
        ],
        examples: [
            {
                input: `x = 123`,
                output: "321",
                image: ''
            },
            {
                input: `s = "cbbd"`,
                output: "bb",
            },
        ],
        category: "medium",
        topics: ["Two Pointers", "String", "Dynamic Programming"],
        acceptance: 0,
        hint: ["How can we reuse a previously computed palindrome to compute a larger palindrome?", "If “aba” is a palindrome, is “xabax” a palindrome? Similarly is “xabay” a palindrome?", "Complexity based hint: If we use brute-force and check whether for every start and end position a substring is a palindrome we have O(n^2) start - end pairs and O(n) palindromic checks. Can we reduce the time for palindromic checks to O(1) by reusing some previous computation."],
        constraints: [
            "1 <= s.length <= 1000",
            "s consist of only digits and English letters.",
        ],
        company: ["Amazon", "Facebook (Meta)", "Google", "Microsoft", "Apple",],
        Accepted: [],
        followUp: [],
        comments: []
    },
    {
        questionNo: 6,
        title: "Zigzag Conversion",
        // image: "https://assets.leetcode.com/uploads/2020/10/02/addtwonumber1.jpg",
        description: [
            `The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)`,
            `P   A   H   N`,
            `A P L S I I G`,
            `Y   I   R`,
            `And then read line by line: "PAHNAPLSIIGYIR"`,
            "Write the code that will take a string and make this conversion given a number of rows:",
            'string convert(string s, int numRows);'
        ],
        examples: [
            {
                input: `s = "PAYPALISHIRING", numRows = 3`,
                output: "PAHNAPLSIIGYIR",
            },
            {
                input: `s = "PAYPALISHIRING", numRows = 4`,
                output: "PINALSIGYAHRPI",
                description: `P     I    N
                A   L S  I G
                Y A   H R
                P     I`,
            },
        ],
        category: "medium",
        topics: ["String"],
        acceptance: 0,
        hint: [],
        constraints: [
            "1 <= s.length <= 1000",
            "s consists of English letters (lower-case and upper-case), ',' and '.'.",
            "1 <= numRows <= 1000",
        ],
        company: ["Amazon", "Microsoft", "Adobe", "Apple", "Google", "Uber"],
        Accepted: [],
        followUp: [],
        comments: []
    }
]


const deleteUser = async () => {
    const users = await User.deleteMany({});

    console.log(users);
}

const contestQuestions = [{
    contestNo: 2,
    questions: [],
    participatedUser: [],
}];

const tempContest = {
    contest: 1,
    date: "2024-12-01T10:00:00.000Z",
    contestQuestions: [
        new mongoose.Types.ObjectId("672f52b926da66789c2b48b7"),
        new mongoose.Types.ObjectId("672f57d9f13b8610bb1e2909"),
        new mongoose.Types.ObjectId("672f5d8a66ce0b11a10ca74a"),
        new mongoose.Types.ObjectId("672f5d8a66ce0b11a10ca74b"),
    ],
    rank: 45,
    score: 95,
    timeTaken: "80.15", // Converted to a string to match the schema
};

async function insertData() {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: "673837c4ca83fe624cec843d" }, 
        { $push: { "userProgress.contestStatus": tempContest } }, 
        { new: true } 
      );
      console.log("Updated User:", updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }
  
  insertData();
  

insertData();



