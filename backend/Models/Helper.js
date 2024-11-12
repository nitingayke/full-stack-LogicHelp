require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("./Questions.js");

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
            "Given a string s, return the longest palindromic substring in s.",
        ],
        examples: [
            {
                input: `s = "babad"`,
                output: "bab",
                description: `"aba" is also a valid answer.`
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

function insertData(){

    Question.insertMany(questions)
    .then((docs) => {
        console.log("questions inserted successfully: "+docs);
    })
    .catch((error) => {
        console.log("Error inserting question "+ error);
    })
}

insertData();