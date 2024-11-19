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
        question.title.toLowerCase().includes(query.toLowerCase()) || question.questionNo === Number(query)
    );
}

export const solutions = [
    {
        title: "Two Sum",
        solution: `
      // Problem: Two Sum
      // Given an array of integers nums and an integer target,
      // return indices of the two numbers such that they add up to the target.
      import java.util.HashMap;
      import java.util.Map;
  
      public int[] twoSum(int[] nums, int target) {
          Map<Integer, Integer> map = new HashMap<>();
          for (int i = 0; i < nums.length; i++) {
              int complement = target - nums[i];
              if (map.containsKey(complement)) {
                  return new int[] { map.get(complement), i };
              }
              map.put(nums[i], i);
          }
          throw new IllegalArgumentException("No solution found");
      }
      `
    },
    {
        title: "Add Two Numbers",
        solution: `
      // Problem: Add Two Numbers
      // Add two numbers represented as linked lists.
      class ListNode {
          int val;
          ListNode next;
          ListNode(int x) { val = x; }
      }
  
      public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
          ListNode dummyHead = new ListNode(0);
          ListNode p = l1, q = l2, current = dummyHead;
          int carry = 0;
  
          while (p != null || q != null) {
              int x = (p != null) ? p.val : 0;
              int y = (q != null) ? q.val : 0;
              int sum = carry + x + y;
              carry = sum / 10;
              current.next = new ListNode(sum % 10);
              current = current.next;
              if (p != null) p = p.next;
              if (q != null) q = q.next;
          }
          if (carry > 0) {
              current.next = new ListNode(carry);
          }
          return dummyHead.next;
      }
      `
    },
    {
        title: "Median of Two Sorted Arrays",
        solution: `
      // Problem: Median of Two Sorted Arrays
      // Find the median of two sorted arrays.
      public double findMedianSortedArrays(int[] nums1, int[] nums2) {
          if (nums1.length > nums2.length) {
              return findMedianSortedArrays(nums2, nums1);
          }
          int x = nums1.length;
          int y = nums2.length;
          int low = 0, high = x;
  
          while (low <= high) {
              int partitionX = (low + high) / 2;
              int partitionY = (x + y + 1) / 2 - partitionX;
  
              int maxX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
              int minX = (partitionX == x) ? Integer.MAX_VALUE : nums1[partitionX];
              int maxY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
              int minY = (partitionY == y) ? Integer.MAX_VALUE : nums2[partitionY];
  
              if (maxX <= minY && maxY <= minX) {
                  if ((x + y) % 2 == 0) {
                      return ((double)Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;
                  } else {
                      return (double)Math.max(maxX, maxY);
                  }
              } else if (maxX > minY) {
                  high = partitionX - 1;
              } else {
                  low = partitionX + 1;
              }
          }
          throw new IllegalArgumentException("Input arrays are not sorted.");
      }
      `
    },
    {
        title: "Longest Palindromic Substring",
        solution: `
      // Problem: Longest Palindromic Substring
      // Find the longest palindromic substring in a given string.
      public String longestPalindrome(String s) {
          if (s == null || s.length() < 1) return "";
          int start = 0, end = 0;
  
          for (int i = 0; i < s.length(); i++) {
              int len1 = expandFromCenter(s, i, i);
              int len2 = expandFromCenter(s, i, i + 1);
              int len = Math.max(len1, len2);
              if (len > end - start) {
                  start = i - (len - 1) / 2;
                  end = i + len / 2;
              }
          }
          return s.substring(start, end + 1);
      }
  
      private int expandFromCenter(String s, int left, int right) {
          while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
              left--;
              right++;
          }
          return right - left - 1;
      }
      `
    },
    {
        title: "Zigzag Conversion",
        solution: `
      // Problem: Zigzag Conversion
      // Convert a string to a zigzag pattern.
      public String convert(String s, int numRows) {
          if (numRows == 1) return s;
  
          StringBuilder[] rows = new StringBuilder[numRows];
          for (int i = 0; i < numRows; i++) {
              rows[i] = new StringBuilder();
          }
          int currentRow = 0;
          boolean goingDown = false;
  
          for (char c : s.toCharArray()) {
              rows[currentRow].append(c);
              if (currentRow == 0 || currentRow == numRows - 1) goingDown = !goingDown;
              currentRow += goingDown ? 1 : -1;
          }
  
          StringBuilder result = new StringBuilder();
          for (StringBuilder row : rows) {
              result.append(row);
          }
          return result.toString();
      }
      `
    }
];

export const companies = [
    "Microsoft", "Google", "Amazon", "Apple", "Facebook", "IBM", "SAP", "Oracle",
    "Salesforce", "Accenture", "Cognizant", "Capgemini", "Infosys", "Wipro", "TCS",
    "Tech Mahindra", "HCL Technologies", "Mindtree", "Larsen & Toubro Infotech",
    "Mphasis", "Zensar Technologies", "Syntel", "CGI", "Persistent Systems",
    "Sonata Software", "Nagarro", "Fujitsu", "Tata Elxsi", "iGate", "Hexaware Technologies",
    "NTT Data", "Atos", "Qualys", "BlackBerry", "Rakuten", "KPMG", "Deloitte", "Capco",
    "EPAM Systems", "PayPal", "LinkedIn", "Cisco", "VMware", "ServiceNow", "SAP Labs",
    "FIS", "Alfresco", "Box", "ServiceTitan", "Airbnb", "Snapchat", "Twitter", "Uber"
];

export const topics = [
    "Array",
    "String",
    "Linked List",
    "Stacks",
    "Queues",
    "Hash Table",
    "Trees",
    "Math",
    "Graphs",
    "Tries",
    "Heap (Priority Queue)",
    "Bit Manipulation",
    "Sorting and Searching",
    "Dynamic Programming",
    "Divide and Conquer",
    "Backtracking",
    "Greedy Algorithms",
    "Binary Search",
    "Breadth-First Search",
    "Depth-First Search",
    "Prefix Sum",
    "Sliding Window",
    "Union Find",
    "Two Pointers",
    "Binary Indexed Tree",
    "Segment Tree",
    "Monotonic Stack",
    "Recursion",
    "Memoization",
    "Topological Sort",
    "Shortest Path",
    "Graph Theory",
    "Binary Search Tree",
    "Enumeration",
    "Bitmask",
    "Counting",
    "Design",
    "Combinatorics",
    "Geometry",
    "Trie",
    "Interactive",
    "Data Stream",
    "Monotonic Queue",
    "Randomized Algorithms",
    "Game Theory",
    "Number Theory",
    "Brainteaser",
    "Line Sweep",
    "Shell",
    "Probability and Statistics",
    "Concurrency",
    "Suffix Array",
    "Quickselect",
    "Counting Sort",
    "Bucket Sort",
    "Merge Sort",
    "Minimum Spanning Tree",
    "Eulerian Circuit",
    "Radix Sort",
    "Reservoir Sampling",
    "Rejection Sampling",
    "Biconnected Component",
    "Strongly Connected Component",
    "Basic SQL Queries",
    "Data Definition Language (DDL)",
    "Data Manipulation Language (DML)",
    "Data Control Language (DCL)",
    "Transaction Control Language (TCL)",
    "Joins (INNER, LEFT, RIGHT, FULL)",
    "Aggregations (SUM, COUNT, AVG, MIN, MAX)",
    "Group By and Having",
    "Subqueries",
    "Nested Queries",
    "Indexes",
    "Views",
    "Stored Procedures",
    "Functions",
    "Triggers",
    "Normalization and Denormalization",
    "Constraints (Primary Key, Foreign Key, Unique, Check)",
    "Window Functions",
    "Case Statements",
    "Union and Union All",
    "Self Join",
    "Recursive Queries (WITH CTE)",
    "Transactions and ACID Properties",
    "Error Handling",
    "Data Types",
    "Performance Optimization",
    "JSON and XML Data",
    "Temporary Tables",
    "Pivot and Unpivot",
    "Row Number and Ranking",
    "Data Export and Import",
    "Database Design"
];

export const contestQuestions = [
    {
        questionNo: 1,
        title: 'Find the K-th Character in String Game I',
        description: [
            `Alice and Bob are playing a game. Initially, Alice has a string word = "a".`,
            `You are given a positive integer k.`,
            `Now Bob will ask Alice to perform the following operation forever:`,
            `Generate a new string by changing each character in word to its next character in the English alphabet, and append it to the original word.`,
            `For example, performing the operation on "c" generates "cd" and performing the operation on "zb" generates "zbac".`,
            `Return the value of the kth character in word, after enough operations have been done for word to have at least k characters.`,
            `Note that the character 'z' can be changed to 'a' in the operation.`
        ],
        examples: [
            {
                input: 'k = 5',
                output: 'b',
                description: [`Initially, word = "a". We need to do the operation three times:`, `Generated string is "b", word becomes "ab".`, `Generated string is "bc", word becomes "abbc".`, `Generated string is "bccd", word becomes "abbcbccd".`],
            }, {
                input: 'k = 10',
                output: 'c',
            }
        ],
        category: 'easy',
        acceptance: 0,
        constraints: ['1 <= k <= 500']
    },
    {
        questionNo: 2,
        title: 'Count of Substrings Containing Every Vowel and K Consonants I',
        description: [
            `You are given a string word and a non-negative integer k.`, `Return the total number of substrings of word that contain every vowel ('a', 'e', 'i', 'o', and 'u') at least once and exactly k consonants.`
        ],
        examples: [
            {
                input: `word = "aeioqq", k = 1`,
                output: `0`,
                description: `There is no substring with every vowel.`
            },
            {
                input: `word = "aeiou", k = 0`,
                output: `1`,
                description: 'The only substring with every vowel and zero consonants is word[0..4], which is "aeiou".'
            }
        ],
        category: 'medium',
        acceptance: 0,
        constraints: [`5 <= word.length <= 250`, `word consists only of lowercase English letters.`, `0 <= k <= word.length - 5`]
    },
    {
        questionNo: 3,
        title: 'Count of Substrings Containing Every Vowel and K Consonants II',
        image: "https://assets.leetcode.com/uploads/2020/11/04/container.jpg",
        description: [
            "You are given a string word and a non-negative integer k.",
            `Return the total number of substrings of word that contain every vowel ('a', 'e', 'i', 'o', and 'u') at least once and exactly k consonants.`,
        ],
        examples: [
            {
                input: ' word = "aeioqq", k = 1',
                output: '0',
                description: 'There is no substring with every vowel.'
            }, {
                input: `word = "aeiou", k = 0`,
                output: `1`,
                description: `The only substring with every vowel and zero consonants is word[0..4], which is "aeiou".`,
            }
        ],
        category: 'medium',
        acceptance: 0,
        constraints: [`5 <= word.length <= 2 * 105`, `word consists only of lowercase English letters.`, `0 <= k <= word.length - 5`]
    },
    {
        questionNo: 4,
        title: 'Find the K-th Character in String Game II',
        image: "https://assets.leetcode.com/uploads/2020/10/03/median_arrays.jpg",
        description: [
            `Alice and Bob are playing a game. Initially, Alice has a string word = "a".`,
            `You are given a positive integer k. You are also given an integer array operations, where operations[i] represents the type of the ith operation.`,
            `Now Bob will ask Alice to perform all operations in sequence:`,
            `If operations[i] == 0, append a copy of word to itself.`,
            `If operations[i] == 1, generate a new string by changing each character in word to its next character in the English alphabet, and append it to the original word. For example, performing the operation on "c" generates "cd" and performing the operation on "zb" generates "zbac".`,
            `Return the value of the kth character in word after performing all the operations.`,
            `Note that the character 'z' can be changed to 'a' in the second type of operation.`
        ],
        examples: [
            {
                input: ' k = 5, operations = [0,0,0]',
                output: '"a"',
                description: [`Initially, word == "a". Alice performs the three operations as follows:`, `Appends "a" to "a", word becomes "aa".`, `Appends "aa" to "aa", word becomes "aaaa".`, `Appends "aaaa" to "aaaa", word becomes "aaaaaaaa".`]
            },
            {
                input: 'k = 10, operations = [0,1,0,1]',
                output: '"b"',
                description: [`Initially, word == "a". Alice performs the four operations as follows:`, `Appends "a" to "a", word becomes "aa".`, `Appends "bb" to "aa", word becomes "aabb".`, `Appends "aabb" to "aabb", word becomes "aabbaabb".`, `Appends "bbccbbcc" to "aabbaabb", word becomes "aabbaabbbbccbbcc".`],
            }
        ],
        category: 'hard',
        acceptance: 0,
        constraints: [
            '1 <= k <= 1014',
            '1 <= operations.length <= 100',
            'operations[i] is either 0 or 1.',
            'The input is generated such that word has at least k characters after all operations.',
        ]
    }
];

export const pastContests = [
    {
        contestTitle: "Weekly Contest 4",
        time: "20:00",
        date: "2024-10-29",
        problemList: [
            {
                questionNo: 1,
                title: "Palindrome Number",
                image: "https://example.com/palindrome.jpg",
                description: [
                    "Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward."
                ],
                examples: [
                    { input: "121", output: "true", description: ["121 reads as 121 from left to right and right to left."] },
                    { input: "-121", output: "false", description: ["From left to right, it reads -121. From right to left, it becomes 121-. Therefore, it is not a palindrome."] }
                ],
                category: "easy",
                acceptance: 48.9,
                constraints: [
                    "-231 <= x <= 231 - 1"
                ]
            },
            {
                questionNo: 2,
                title: "Longest Substring Without Repeating Characters",
                image: "https://example.com/longest_substring.jpg",
                description: [
                    "Given a string s, find the length of the longest substring without repeating characters."
                ],
                examples: [
                    { input: `"abcabcbb"`, output: "3", description: ["The answer is 'abc', with the length of 3."] },
                    { input: `"bbbbb"`, output: "1", description: ["The answer is 'b', with the length of 1."] }
                ],
                category: "medium",
                acceptance: 33.7,
                constraints: [
                    "0 <= s.length <= 5 * 104",
                    "s consists of English letters, digits, symbols, and spaces."
                ]
            },
            {
                questionNo: 3,
                title: "Kth Largest Element in an Array",
                image: "https://example.com/kth_largest.jpg",
                description: [
                    "Find the kth largest element in an unsorted array. Note that it is the kth largest element in sorted order, not the kth distinct element."
                ],
                examples: [
                    { input: `[3,2,1,5,6,4], k = 2`, output: "5", description: ["The 2nd largest element is 5."] },
                    { input: `[3,2,3,1,2,4,5,5,6], k = 4`, output: "4", description: ["The 4th largest element is 4."] }
                ],
                category: "medium",
                acceptance: 58.3,
                constraints: [
                    "1 <= k <= nums.length <= 104",
                    "-104 <= nums[i] <= 104"
                ]
            },
            {
                questionNo: 4,
                title: "Find the K-th Character in String Game II",
                image: "https://assets.leetcode.com/uploads/2020/10/03/median_arrays.jpg",
                description: [
                    `Alice and Bob are playing a game. Initially, Alice has a string word = "a".`,
                    `You are given a positive integer k. You are also given an integer array operations, where operations[i] represents the type of the ith operation.`,
                    `Now Bob will ask Alice to perform all operations in sequence:`,
                    `If operations[i] == 0, append a copy of word to itself.`,
                    `If operations[i] == 1, generate a new string by changing each character in word to its next character in the English alphabet, and append it to the original word.`,
                    `Return the value of the kth character in word after performing all the operations.`,
                    `Note that the character 'z' can be changed to 'a' in the second type of operation.`
                ],
                examples: [
                    {
                        input: "k = 5, operations = [0,0,0]",
                        output: `"a"`,
                        description: [
                            `Initially, word == "a". Alice performs the three operations as follows:`,
                            `Appends "a" to "a", word becomes "aa".`,
                            `Appends "aa" to "aa", word becomes "aaaa".`,
                            `Appends "aaaa" to "aaaa", word becomes "aaaaaaaa".`
                        ]
                    },
                    {
                        input: "k = 10, operations = [0,1,0,1]",
                        output: `"b"`,
                        description: [
                            `Initially, word == "a". Alice performs the four operations as follows:`,
                            `Appends "a" to "a", word becomes "aa".`,
                            `Appends "bb" to "aa", word becomes "aabb".`,
                            `Appends "aabb" to "aabb", word becomes "aabbaabb".`,
                            `Appends "bbccbbcc" to "aabbaabb", word becomes "aabbaabbbbccbbcc".`
                        ]
                    }
                ],
                category: "hard",
                acceptance: 0.0,
                constraints: [
                    "1 <= k <= 1014",
                    "1 <= operations.length <= 100",
                    "operations[i] is either 0 or 1.",
                    "The input is generated such that word has at least k characters after all operations."
                ]
            }
        ],
        contestRanking: [
            { username: "coder123", image: "https://example.com/user1.jpg", contestRank: 1 },
            { username: "dev_master", image: "https://example.com/user2.jpg", contestRank: 2 },
            { username: "algorithm_wiz", image: "https://example.com/user3.jpg", contestRank: 3 }
        ]
    },
    {
        contestTitle: "Weekly Contest 3",
        time: "18:00",
        date: "2024-11-01",
        problemList: [
            {
                questionNo: 1,
                title: "Unique Binary Search Trees",
                image: "https://example.com/unique_bst.jpg",
                description: [
                    "Given an integer n, return the number of structurally unique BST's (binary search trees) which has exactly n nodes of unique values from 1 to n."
                ],
                examples: [
                    { input: "n = 3", output: "5", description: ["There are 5 unique BSTs that can be constructed with 3 nodes."] },
                    { input: "n = 1", output: "1", description: ["There is only one unique BST with 1 node."] }
                ],
                category: "medium",
                acceptance: 55.6,
                constraints: ["1 <= n <= 19"]
            },
            {
                questionNo: 2,
                title: "Longest Palindromic Substring",
                image: "https://example.com/palindromic_substring.jpg",
                description: [
                    "Given a string s, return the longest palindromic substring in s."
                ],
                examples: [
                    { input: `"babad"`, output: `"bab"`, description: ["Note that 'aba' is also a valid answer."] },
                    { input: `"cbbd"`, output: `"bb"`, description: ["The longest palindromic substring is 'bb'."] }
                ],
                category: "medium",
                acceptance: 31.8,
                constraints: ["1 <= s.length <= 1000", "s consist of only digits and English letters."]
            },
            {
                questionNo: 3,
                title: "N-Queens II",
                image: "https://example.com/nqueens.jpg",
                description: [
                    "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.",
                    "Given an integer n, return the number of distinct solutions to the n-queens puzzle."
                ],
                examples: [
                    { input: "n = 4", output: "2", description: ["There are two distinct solutions to the 4-queens puzzle."] },
                    { input: "n = 1", output: "1", description: ["There is only one solution for n = 1."] }
                ],
                category: "hard",
                acceptance: 42.9,
                constraints: ["1 <= n <= 9"]
            },
            {
                questionNo: 4,
                title: "Trapping Rain Water",
                image: "https://example.com/trapping_rain_water.jpg",
                description: [
                    "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining."
                ],
                examples: [
                    { input: `[0,1,0,2,1,0,1,3,2,1,2,1]`, output: "6", description: ["The amount of water trapped is 6 units."] },
                    { input: `[4,2,0,3,2,5]`, output: "9", description: ["The amount of water trapped is 9 units."] }
                ],
                category: "hard",
                acceptance: 52.4,
                constraints: ["n == height.length", "0 <= n <= 2 * 104", "0 <= height[i] <= 105"]
            }
        ],
        contestRanking: [
            { username: "pro_solver", image: "https://example.com/user4.jpg", contestRank: 1 },
            { username: "challenger", image: "https://example.com/user5.jpg", contestRank: 2 },
            { username: "code_master", image: "https://example.com/user6.jpg", contestRank: 3 }
        ]
    },
    {
        contestTitle: "Weekly Contest 2",
        time: "15:00",
        date: "2024-11-15",
        problemList: [
            {
                questionNo: 1,
                title: "Binary Tree Level Order Traversal",
                image: "https://example.com/binary_tree.jpg",
                description: [
                    "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level)."
                ],
                examples: [
                    { input: "[3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]", description: ["Return the level order traversal as nested arrays."] },
                    { input: "[1]", output: "[[1]]", description: ["Only one node at level 1."] }
                ],
                category: "medium",
                acceptance: 63.2,
                constraints: ["The number of nodes in the tree is in the range [0, 2000].", "-1000 <= Node.val <= 1000"]
            },
            {
                questionNo: 2,
                title: "Course Schedule",
                image: "https://example.com/course_schedule.jpg",
                description: [
                    "There are a total of numCourses courses you have to take, labeled from 0 to numCourses-1. Some courses may have prerequisites.",
                    "Return true if you can finish all courses. Otherwise, return false."
                ],
                examples: [
                    { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true", description: ["You can finish the courses."] },
                    { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false", description: ["You cannot finish the courses due to a cycle."] }
                ],
                category: "medium",
                acceptance: 43.5,
                constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000", "prerequisites[i].length == 2"]
            },
            {
                questionNo: 3,
                title: "Merge Intervals",
                image: "https://example.com/merge_intervals.jpg",
                description: [
                    "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals."
                ],
                examples: [
                    { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", description: ["Merged intervals result."] },
                    { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]", description: ["Merged into one interval."] }
                ],
                category: "medium",
                acceptance: 45.3,
                constraints: ["1 <= intervals.length <= 104", "intervals[i].length == 2", "0 <= starti <= endi <= 104"]
            },
            {
                questionNo: 4,
                title: "Find Median from Data Stream",
                image: "https://example.com/median_data_stream.jpg",
                description: [
                    "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value; the median is the mean of the two middle values.",
                    "Implement the MedianFinder class with methods to add numbers and find the median."
                ],
                examples: [
                    { input: "addNum(1), addNum(2), findMedian()", output: "1.5", description: ["Median of [1, 2] is 1.5."] },
                    { input: "addNum(3), findMedian()", output: "2", description: ["Median of [1, 2, 3] is 2."] }
                ],
                category: "hard",
                acceptance: 41.9,
                constraints: ["-105 <= val <= 105", "At most 5 * 104 calls will be made to addNum and findMedian."]
            }
        ],
        contestRanking: [
            { username: "fast_runner", image: "https://example.com/user7.jpg", contestRank: 1 },
            { username: "puzzle_slayer", image: "https://example.com/user8.jpg", contestRank: 2 },
            { username: "logic_master", image: "https://example.com/user9.jpg", contestRank: 3 }
        ]
    },
    {
        contestTitle: "Weekly Contest 1",
        time: "14:30",
        date: "2024-11-20",
        problemList: [
            {
                questionNo: 1,
                title: "Two Sum",
                image: "https://example.com/two_sum.jpg",
                description: [
                    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
                ],
                examples: [
                    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", description: ["The numbers at indices 0 and 1 add up to 9."] },
                    { input: "nums = [3,2,4], target = 6", output: "[1,2]", description: ["The numbers at indices 1 and 2 add up to 6."] }
                ],
                category: "easy",
                acceptance: 45.8,
                constraints: ["2 <= nums.length <= 104", "-109 <= nums[i] <= 109", "-109 <= target <= 109", "Only one valid answer exists."]
            },
            {
                questionNo: 2,
                title: 'Add Two Numbers',
                description: [
                    "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contains a single digit.",
                    "Add the two numbers and return it as a linked list."
                ],
                examples: [
                    { input: '[2 -> 4 -> 3] + [5 -> 6 -> 4]', output: '[7 -> 0 -> 8]', description: 'The sum is 807.' }
                ],
                category: 'medium',
                topics: ['linked lists', 'math'],
                acceptance: 80,
                hint: ['Consider carrying values while adding digits.'],
                company: ['LeetCode', 'Facebook'],
                constraints: ['The number of nodes in each linked list is in the range [1, 100].', '0 <= Node.val <= 9'],
                followUp: ['Can you do this without using extra space?'],
                comments: [
                    { user: 'User3', text: 'Great practice for linked lists!', createdAt: "" }
                ],
                tags: ['Linked List', 'Math'],
            },
            {
                questionNo: 3,
                title: 'Longest Substring Without Repeating Characters',
                description: [
                    "Given a string s, find the length of the longest substring without repeating characters."
                ],
                examples: [
                    { input: '"abcabcbb"', output: '3', description: 'The answer is "abc", with length 3.' }
                ],
                category: 'medium',
                topics: ['strings', 'sliding window'],
                acceptance: 75,
                hint: ['Use a sliding window to track characters.'],
                company: ['Google', 'Amazon'],
                constraints: ['0 <= s.length <= 5 * 10^4'],
                followUp: ['Can you optimize to O(n) time complexity?'],
                comments: [
                    { user: 'User4', text: 'The sliding window technique is very useful!', createdAt: "" }
                ],
                tags: ['String', 'Sliding Window'],
            },
            {
                questionNo: 4,
                title: 'Valid Parentheses',
                description: [
                    "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid."
                ],
                examples: [
                    { input: '"()[]{}"', output: 'true', description: 'All parentheses are matched.' }
                ],
                category: 'easy',
                topics: ['strings', 'stack'],
                acceptance: 70,
                hint: ['Use a stack to keep track of opening brackets.'],
                company: ['LeetCode', 'Facebook'],
                constraints: ['1 <= s.length <= 104'],
                followUp: ['What if we also include angle brackets?'],
                comments: [
                    { user: 'User5', text: 'Good way to practice stacks!', createdAt: "" }
                ],
                tags: ['String', 'Stack'],
            },
        ],
        contestRanking: [
            { username: "novice_champ", image: "https://example.com/user10.jpg", contestRank: 1 },
            { username: "rookie_coder", image: "https://example.com/user11.jpg", contestRank: 2 },
            { username: "young_genius", image: "https://example.com/user12.jpg", contestRank: 3 }
        ]
    }
];

export const userDoubts = [
    {
        username: "john doe",
        image: "https://mui.com/static/images/avatar/1.jpg",
        rank: 125,
        tag: "DSA",
        title: "Why is QuickSort faster than MergeSort?",
        message: "I understand that QuickSort is often faster than MergeSort in practice. Can someone explain why that happens even though MergeSort has a better worst-case time complexity?",
        watch: 75,
        createdAt: "2024-11-07",
        comments: [
            { username: "algorithm_ninja", image: "https://mui.com/static/images/avatar/3.jpg", rank: 5694, message: "QuickSort is faster in practice because it has better locality of reference and smaller hidden constants." },
            { username: "sorting_sage", image: "https://mui.com/static/images/avatar/5.jpg", rank: 3201, message: "Also, QuickSort is in-place, which saves on memory allocation compared to MergeSort." },
            { username: "algo_guru", image: "https://mui.com/static/images/avatar/2.jpg", rank: 275, message: "QuickSort's average case is generally faster unless pivot selection is poor." },
            { username: "cs_theorist", image: "https://mui.com/static/images/avatar/6.jpg", rank: 4220, message: "In distributed systems, MergeSort has benefits due to its stability, though." },
            { username: "data_scientist23", image: "https://mui.com/static/images/avatar/4.jpg", rank: 1380, message: "Both have their places! I prefer MergeSort for large datasets." }
        ]
    },
    {
        username: "jane_smith",
        image: "https://mui.com/static/images/avatar/7.jpg",
        rank: 432,
        tag: "Algorithms",
        title: "When to use dynamic programming?",
        message: "I'm confused about when dynamic programming is appropriate for a problem. Any tips on identifying DP problems quickly?",
        watch: 102,
        createdAt: "2024-11-06",
        comments: [
            { username: "dp_master", image: "https://mui.com/static/images/avatar/8.jpg", rank: 598, message: "Look for overlapping subproblems and optimal substructure. Those are clear indicators." },
            { username: "algo_novice", image: "https://mui.com/static/images/avatar/9.jpg", rank: 2210, message: "If you find yourself solving the same subproblems repeatedly, DP can help." },
            { username: "recursion_fan", image: "https://mui.com/static/images/avatar/10.jpg", rank: 875, message: "DP is usually useful when recursion is causing excessive computations." },
            { username: "opt_solver", image: "https://mui.com/static/images/avatar/11.jpg", rank: 310, message: "Try visualizing the problem as a table of solutions!" }
        ]
    },
    {
        username: "coding_wizard",
        image: "https://mui.com/static/images/avatar/12.jpg",
        rank: 8741,
        tag: "Data Structures",
        title: "Difference between Trie and HashMap?",
        message: "What are the advantages of using a Trie over a HashMap for storing words? I'm curious about performance implications.",
        watch: 64,
        createdAt: "2024-11-05",
        comments: [
            { username: "structure_guru", image: "https://mui.com/static/images/avatar/13.jpg", rank: 5302, message: "Tries offer prefix-based search which is great for dictionaries, unlike HashMaps." },
            { username: "ds_enthusiast", image: "https://mui.com/static/images/avatar/14.jpg", rank: 1421, message: "Tries can be more memory efficient than HashMaps for a large set of strings." },
            { username: "hash_map_fan", image: "https://mui.com/static/images/avatar/15.jpg", rank: 1987, message: "HashMaps are faster for exact key lookups, though, especially for large datasets." },
            { username: "tree_hugger", image: "https://mui.com/static/images/avatar/16.jpg", rank: 512, message: "Tries can be faster for autocomplete functions and finding the longest common prefix." },
            { username: "big_data_dev", image: "https://mui.com/static/images/avatar/17.jpg", rank: 698, message: "I'd recommend tries for smaller datasets, and HashMaps for big data applications." }
        ]
    },
    {
        username: "tech_lover",
        image: "https://mui.com/static/images/avatar/18.jpg",
        rank: 5643,
        tag: "Web Development",
        title: "Best practices for REST API security?",
        message: "What are some good practices for securing a REST API? I'm particularly interested in strategies for authentication and data protection.",
        watch: 130,
        createdAt: "2024-11-04",
        comments: [
            { username: "security_guru", image: "https://mui.com/static/images/avatar/19.jpg", rank: 7895, message: "Always use HTTPS to ensure data encryption in transit." },
            { username: "dev_ops_pro", image: "https://mui.com/static/images/avatar/20.jpg", rank: 4231, message: "Consider using JWTs for stateless authentication and token expiration." },
            { username: "api_wizard", image: "https://mui.com/static/images/avatar/21.jpg", rank: 2198, message: "Limit the access scope and implement rate limiting to prevent abuse." },
            { username: "data_guard", image: "https://mui.com/static/images/avatar/22.jpg", rank: 3129, message: "Use API gateways for better control and monitoring of incoming requests." }
        ]
    }
];

export const challenges = [
    {
        title: "DSA Challenge: Largest Combination with Bitwise AND > 0",
        textMessage: `You are given an array of positive integers 'candidates'. Evaluate the bitwise AND of every combination of numbers in 'candidates', where each number may only be used once in each combination.
        
        Return the size of the largest combination of 'candidates' with a bitwise AND greater than 0.
        
        Example 1:
        Input: candidates = [16,17,71,62,12,24,14]
        Output: 4
        Explanation: The combination [16,17,62,24] has a bitwise AND of 16 & 17 & 62 & 24 = 16 > 0.
        The size of this combination is 4. It can be shown that no combination with a size greater than 4 has a bitwise AND greater than 0.`,
        tag: "DSA",
        user: {
            username: "Coder123",
            userImage: "url-to-user-image1",
        },
        result: [
            {
                username: "DSA_Warrior",
                image: "url-to-user-image5",
                message: `Completed it! Got the maximum combination size of 4. Used bitwise AND operations. Solution code:\n
                \`\`\`python
                def largest_combination(candidates):
                    max_size = 0
                    for i in range(len(candidates)):
                        for j in range(i+1, len(candidates)):
                            if (candidates[i] & candidates[j]) > 0:
                                max_size = max(max_size, 2)
                    return max_size
                \`\`\`
                This solution leverages bitwise AND to check combinations. The size of the largest combination where the AND is greater than 0 is calculated by iterating over pairs of elements.`
            },
            {
                username: "AlgoAce",
                image: "url-to-user-image6",
                message: `Solved it with a bitwise manipulation technique. Technologies used: C++, Python. Solution code:\n
                \`\`\`python
                from collections import defaultdict
                
                def largest_combination(candidates):
                    bit_count = defaultdict(int)
                    for num in candidates:
                        for i in range(32):  # Check bitwise for each number
                            if num & (1 << i):
                                bit_count[i] += 1
                    return max(bit_count.values())
                \`\`\`
                In this approach, we use a bit count to store how many numbers have each bit set. The largest count gives us the maximum combination size with a bitwise AND greater than 0.`
            },
            {
                username: "CodeNinja",
                image: "url-to-user-image7",
                message: `Great problem for practicing bitwise operations. Technologies used: Python, Java. Solution code:\n
                \`\`\`python
                def largest_combination(candidates):
                    bitwise_combinations = [0] * 32
                    for num in candidates:
                        for i in range(32):
                            if num & (1 << i):
                                bitwise_combinations[i] += 1
                    return max(bitwise_combinations)
                \`\`\`
                This solution uses an efficient bitwise manipulation approach to determine the largest possible combination size where the AND operation results in a non-zero value.`
            }
        ]
    },
    {
        title: "Web Development Challenge: Build a Modern Login Page",
        textMessage: `Design and build a modern login page with fields for username, password, and a submit button. Ensure the following:
        
        - The design is responsive for both desktop and mobile.
        - Implement input validation to prevent empty submissions.
        - Use a clean and modern UI, with CSS animations for input focus and button hover effects.`,
        image: "https://img.freepik.com/free-vector/website-user-login-page-template-design_1017-30786.jpg?w=360",
        tag: "Web Development",
        user: {
            username: "WebDevMaster",
            userImage: "url-to-user-image2",
        },
        result: [
            {
                username: "UX_Designer",
                image: "url-to-user-image8",
                message: "Loved building this! Added animations and made it responsive. Technologies used: HTML, CSS, JavaScript, React.",
                deployLink: "https://myloginpage.com"
            },
            {
                username: "ResponsiveDev",
                image: "url-to-user-image9",
                message: "Form validation and animations added! Looks great on mobile. Technologies used: HTML, CSS, Vue.js.",
                deployLink: "https://responsive-loginpage.com"
            },
            {
                username: "FrontEndGuru",
                image: "url-to-user-image10",
                message: "Completed with a sleek design! Technologies used: HTML, CSS, JavaScript, Bootstrap. Description: Design and build a modern login page with fields for username, password, and a submit button. Ensure the following: - The design is responsive for both desktop and mobile. - Implement input validation to prevent empty submissions. - Use a clean and modern UI, with CSS animations for input focus and button hover effects.",
                deployLink: "https://frontendguru-loginpage.com"
            }
        ]
    },
    {
        title: "AI Challenge: House Price Prediction Model",
        textMessage: `Using machine learning, create a model that predicts house prices based on input features such as area, number of rooms, and location. Requirements:
        
        - Use a dataset of housing data for training.
        - Evaluate the model using Mean Absolute Error (MAE).
        - Provide documentation of each step, from data pre-processing to model evaluation.`,
        tag: "AI",
        user: {
            username: "AIGuru",
            userImage: "url-to-user-image4",
        },
        result: [
            {
                username: "ML_Novice",
                image: "url-to-user-image11",
                message: "Model trained with an MAE of 12000. Technologies used: Python, scikit-learn, Pandas.",
                solutionExplanation: "Used linear regression with feature engineering to improve model accuracy."
            },
            {
                username: "DataSciencePro",
                image: "url-to-user-image12",
                message: "Achieved a solid MAE of 8000! Technologies used: Python, TensorFlow, Numpy.",
                solutionExplanation: "Applied a neural network with regularization techniques to avoid overfitting."
            },
            {
                username: "PredictorX",
                image: "url-to-user-image13",
                message: "Finished the challenge with a MAE of 9500. Technologies used: Python, scikit-learn, Matplotlib.",
                solutionExplanation: "Employed a decision tree regressor and optimized hyperparameters using grid search."
            }
        ]
    },
    {
        title: "Frontend Challenge: Responsive Navbar with Dropdown",
        textMessage: `Design a responsive navbar using HTML, CSS, and JavaScript. The navbar should include:
        
        - A collapsible hamburger menu for mobile views.
        - Dropdown menus on hover for each main item in the navbar.
        - Smooth transitions for showing and hiding the dropdown menus.`,
        tag: "Frontend",
        user: {
            username: "FrontendFanatic",
            userImage: "url-to-user-image3",
        },
        result: [
            {
                username: "UI_Artist",
                image: "url-to-user-image14",
                message: "Completed with smooth transitions! Technologies used: HTML, CSS, JavaScript.",
                deployLink: "https://uiproject-navbar.com"
            },
            {
                username: "JSWhiz",
                image: "url-to-user-image15",
                message: "Cool animations added! Works well on mobile. Technologies used: HTML, CSS, React.",
                deployLink: "https://jswhiz-navbar.com"
            },
            {
                username: "CSSChampion",
                image: "url-to-user-image16",
                message: "Dropdowns are working perfectly. Technologies used: HTML, CSS, JavaScript, Bootstrap.",
                deployLink: "https://csschampion-navbar.com"
            }
        ]
    }
];

export const liveStreamData = [
    {
        username: "dev_guru",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        message: "Excited to take on today's coding challenge! Let's go!"
    },
    {
        username: "code_queen",
        image: "https://randomuser.me/api/portraits/women/22.jpg",
        message: "If anyone needs help, I'm here! Good luck, everyone!"
    },
    {
        username: "js_master",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        message: "Just finished the first part of the challenge. It's tough but fun!"
    },
    {
        username: "design_diva",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        message: "Loving the UI challenge today! Can't wait to see everyone's designs!"
    },
    {
        username: "data_cruncher",
        image: "https://randomuser.me/api/portraits/men/58.jpg",
        message: "Struggling with the logic, but I think I'm close to a solution."
    }
];








