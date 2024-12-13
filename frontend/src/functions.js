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
        question?.title?.toLowerCase().includes(query?.toLowerCase()) || question.questionNo === Number(query)
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
