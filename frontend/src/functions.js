export function timeSlince(date) {
    const now = new Date();
    const then = new Date(date);
    const seconds = Math.floor((now - then) / 1000);

    let interval = seconds / 31536000;
    if (interval >= 1) {
        return Math.floor(interval) + " year";
    }
    interval = seconds / 2592000;
    if (interval >= 1) {
        return Math.floor(interval) + " month";
    }
    interval = seconds / 86400;
    if (interval >= 1) {
        return Math.floor(interval) + " day";
    }
    interval = seconds / 3600;
    if (interval >= 1) {
        return Math.floor(interval) + " hour";
    }
    interval = seconds / 60;
    if (interval >= 1) {
        return Math.floor(interval) + " minute";
    }
    return "just now"; 
}

export function searchQuestions(questions, query) {
    return questions.filter(question => 
        question.title.toLowerCase().includes(query.toLowerCase())
    );
}




export const questions = {
    questionNo: 1,
    title: 'Two Sum',
    description: ["Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.","You may assume that each input would have exactly one solution, and you may not use the same element twice.", "You can return the answer in any order."],
    examples: [
        { input: '[2, 7, 11, 15]', output: '[0, 1]', image: '', description: 'Example where the sum of 2 and 7 equals 9.', }
    ],
    category: 'easy',
    topics: ['arrays', 'hash tables'],
    acceptance: 75,
    hint: 'Consider using a hash map to optimize your solution.',
    company: ['LeetCode', 'Google', 'Amazon', 'Zerodha'],
    constraints: ['1 <= nums.length <= 10^4','-109 <= nums[i] <= 109','-109 <= target <= 109','Only one valid answer exists.'],
    followUp: ['Can you come up with an algorithm that is less than O(n2) time complexity?'],
    comments: [
        { user: 'User1', text: 'Great question!', createdAt: ""},
        { user: 'User2', text: 'I found this challenging.', createAt: ""}
    ],
    tags: ['Array', 'Searching'],
    // solutions, submissions, 
}
