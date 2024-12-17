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
    },
    {
        title: "Reverse Integer",
        solution: `
            // Problem: Reverse Integer
            // Reverse digits of an integer.
            public int reverse(int x) {
                int result = 0;
                while (x != 0) {
                    int digit = x % 10;
                    x /= 10;
                    if (result > Integer.MAX_VALUE / 10 || (result == Integer.MAX_VALUE / 10 && digit > 7)) return 0;
                    if (result < Integer.MIN_VALUE / 10 || (result == Integer.MIN_VALUE / 10 && digit < -8)) return 0;
                    result = result * 10 + digit;
                }
                return result;
            }
        `
    },
    {
        title: "String to Integer (atoi)",
        solution: `
            // Problem: String to Integer (atoi)
            // Convert a string to an integer (implement atoi).
            public int myAtoi(String s) {
                s = s.trim();
                if (s.isEmpty()) return 0;
        
                int sign = 1, i = 0;
                if (s.charAt(i) == '-') {
                    sign = -1;
                    i++;
                } else if (s.charAt(i) == '+') {
                    i++;
                }
        
                int result = 0;
                while (i < s.length() && Character.isDigit(s.charAt(i))) {
                    int digit = s.charAt(i) - '0';
                    if (result > Integer.MAX_VALUE / 10 || (result == Integer.MAX_VALUE / 10 && digit > 7)) return Integer.MAX_VALUE;
                    if (result < Integer.MIN_VALUE / 10 || (result == Integer.MIN_VALUE / 10 && digit < -8)) return Integer.MIN_VALUE;
                    result = result * 10 + digit;
                    i++;
                }
        
                return result * sign;
            }
        `
    },
    {
        title: "Palindrome Number",
        solution: `
            // Problem: Palindrome Number
            // Determine whether an integer is a palindrome.
            public boolean isPalindrome(int x) {
                if (x < 0) return false;
                int original = x, reversed = 0;
                while (x != 0) {
                    reversed = reversed * 10 + x % 10;
                    x /= 10;
                }
                return original == reversed;
            }
        `
    },
    {
        title: "Regular Expression Matching",
        solution: `
            // Problem: Regular Expression Matching
            // Implement regular expression matching with support for '.' and '*'.
            public boolean isMatch(String s, String p) {
                boolean[][] dp = new boolean[s.length() + 1][p.length() + 1];
                dp[0][0] = true;
        
                for (int j = 1; j <= p.length(); j++) {
                    if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 2];
                }
        
                for (int i = 1; i <= s.length(); i++) {
                    for (int j = 1; j <= p.length(); j++) {
                        if (p.charAt(j - 1) == '.' || p.charAt(j - 1) == s.charAt(i - 1)) {
                            dp[i][j] = dp[i - 1][j - 1];
                        } else if (p.charAt(j - 1) == '*') {
                            dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (s.charAt(i - 1) == p.charAt(j - 2) || p.charAt(j - 2) == '.'));
                        }
                    }
                }
        
                return dp[s.length()][p.length()];
            }
        `
    },
    {
        title: "Container With Most Water",
        solution: `
            // Problem: Container With Most Water
            // Given n non-negative integers representing the height of walls, find two lines that together with the x-axis form a container.
            public int maxArea(int[] height) {
                int left = 0, right = height.length - 1;
                int maxArea = 0;
                while (left < right) {
                    int area = Math.min(height[left], height[right]) * (right - left);
                    maxArea = Math.max(maxArea, area);
                    if (height[left] < height[right]) {
                        left++;
                    } else {
                        right--;
                    }
                }
                return maxArea;
            }
        `
    },
    {
        title: "Integer to Roman",
        solution: `
            // Problem: Integer to Roman
            // Convert an integer to a Roman numeral.
            public String intToRoman(int num) {
                String[] roman = {"I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"};
                int[] values = {1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000};
                StringBuilder sb = new StringBuilder();
        
                for (int i = values.length - 1; i >= 0; i--) {
                    while (num >= values[i]) {
                        sb.append(roman[i]);
                        num -= values[i];
                    }
                }
        
                return sb.toString();
            }
        `
    },
    {
        title: "Roman to Integer",
        solution: `
            // Problem: Roman to Integer
            // Convert a Roman numeral to an integer.
            public int romanToInt(String s) {
                Map<Character, Integer> map = new HashMap<>();
                map.put('I', 1);
                map.put('V', 5);
                map.put('X', 10);
                map.put('L', 50);
                map.put('C', 100);
                map.put('D', 500);
                map.put('M', 1000);
        
                int result = 0;
                for (int i = 0; i < s.length(); i++) {
                    if (i + 1 < s.length() && map.get(s.charAt(i)) < map.get(s.charAt(i + 1))) {
                        result -= map.get(s.charAt(i));
                    } else {
                        result += map.get(s.charAt(i));
                    }
                }
        
                return result;
            }
        `
    },
    {
        title: "Longest Common Prefix",
        solution: `
            // Problem: Longest Common Prefix
            // Write a function to find the longest common prefix string amongst an array of strings.
            public String longestCommonPrefix(String[] strs) {
                if (strs == null || strs.length == 0) return "";
                String prefix = strs[0];
                for (int i = 1; i < strs.length; i++) {
                    while (strs[i].indexOf(prefix) != 0) {
                        prefix = prefix.substring(0, prefix.length() - 1);
                        if (prefix.isEmpty()) return "";
                    }
                }
                return prefix;
            }
        `
    },
    {
        title: "3Sum",
        solution: `
            // Problem: 3Sum
            // Given an integer array nums, find all unique triplets in the array which gives the sum of zero.
            public List<List<Integer>> threeSum(int[] nums) {
                List<List<Integer>> result = new ArrayList<>();
                if (nums == null || nums.length < 3) return result;
                Arrays.sort(nums);
        
                for (int i = 0; i < nums.length - 2; i++) {
                    if (i > 0 && nums[i] == nums[i - 1]) continue;
                    int left = i + 1, right = nums.length - 1;
                    while (left < right) {
                        int sum = nums[i] + nums[left] + nums[right];
                        if (sum == 0) {
                            result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                            while (left < right && nums[left] == nums[left + 1]) left++;
                            while (left < right && nums[right] == nums[right - 1]) right--;
                            left++;
                            right--;
                        } else if (sum < 0) {
                            left++;
                        } else {
                            right--;
                        }
                    }
                }
        
                return result;
            }
        `
    },
    {
        title: "3Sum Closest",
        solution: `
            // Problem: 3Sum Closest
            // Given an integer array nums and an integer target, find three integers in nums such that the sum is closest to the target.
            public int threeSumClosest(int[] nums, int target) {
                Arrays.sort(nums);
                int closest = Integer.MAX_VALUE;
                for (int i = 0; i < nums.length - 2; i++) {
                    int left = i + 1, right = nums.length - 1;
                    while (left < right) {
                        int sum = nums[i] + nums[left] + nums[right];
                        if (Math.abs(target - sum) < Math.abs(target - closest)) {
                            closest = sum;
                        }
                        if (sum < target) {
                            left++;
                        } else if (sum > target) {
                            right--;
                        } else {
                            return sum;
                        }
                    }
                }
                return closest;
            }
        `
    },
    {
        title: "Letter Combinations of a Phone Number",
        solution: `
            // Problem: Letter Combinations of a Phone Number
            // Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.
            public List<String> letterCombinations(String digits) {
                List<String> result = new ArrayList<>();
                if (digits == null || digits.length() == 0) return result;
        
                String[] mapping = {"0", "1", "ABC", "DEF", "GHI", "JKL", "MNO", "PQRS", "TUV", "WXYZ"};
                backtrack(result, new StringBuilder(), digits, 0, mapping);
                return result;
            }
        
            private void backtrack(List<String> result, StringBuilder current, String digits, int index, String[] mapping) {
                if (current.length() == digits.length()) {
                    result.add(current.toString());
                    return;
                }
        
                String letters = mapping[digits.charAt(index) - '0'];
                for (char c : letters.toCharArray()) {
                    current.append(c);
                    backtrack(result, current, digits, index + 1, mapping);
                    current.deleteCharAt(current.length() - 1);
                }
            }
        `
    },
    {
        title: "4Sum",
        solution: `
            // Problem: 4Sum
            // Given an array nums of n integers, return all unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
            // nums[a] + nums[b] + nums[c] + nums[d] == target
            public List<List<Integer>> fourSum(int[] nums, int target) {
                List<List<Integer>> result = new ArrayList<>();
                if (nums == null || nums.length < 4) return result;
                Arrays.sort(nums);
        
                for (int i = 0; i < nums.length - 3; i++) {
                    if (i > 0 && nums[i] == nums[i - 1]) continue;
                    for (int j = i + 1; j < nums.length - 2; j++) {
                        if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                        int left = j + 1, right = nums.length - 1;
                        while (left < right) {
                            int sum = nums[i] + nums[j] + nums[left] + nums[right];
                            if (sum == target) {
                                result.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
                                while (left < right && nums[left] == nums[left + 1]) left++;
                                while (left < right && nums[right] == nums[right - 1]) right--;
                                left++;
                                right--;
                            } else if (sum < target) {
                                left++;
                            } else {
                                right--;
                            }
                        }
                    }
                }
        
                return result;
            }
        `
    },
    {
        title: "Remove Nth Node From End of List",
        solution: `
          // Problem: Remove Nth Node From End of List
          // Remove the nth node from the end of a linked list and return its head.
          public ListNode removeNthFromEnd(ListNode head, int n) {
              ListNode fast = head;
              ListNode slow = head;
              for (int i = 0; i < n; i++) {
                  fast = fast.next;
              }
              if (fast == null) return head.next;  // Remove the head node
              while (fast.next != null) {
                  fast = fast.next;
                  slow = slow.next;
              }
              slow.next = slow.next.next;  // Remove the nth node from the end
              return head;
          }
        `
    },
    {
        title: "Valid Parentheses",
        solution: `
          // Problem: Valid Parentheses
          // Check if the input string has valid parentheses.
          public boolean isValid(String s) {
              Stack<Character> stack = new Stack<>();
              for (char c : s.toCharArray()) {
                  if (c == '(' || c == '{' || c == '[') {
                      stack.push(c);
                  } else {
                      if (stack.isEmpty()) return false;
                      char top = stack.pop();
                      if (c == ')' && top != '(') return false;
                      if (c == '}' && top != '{') return false;
                      if (c == ']' && top != '[') return false;
                  }
              }
              return stack.isEmpty();
          }
        `
    },
    {
        title: "Merge Two Sorted Lists",
        solution: `
          // Problem: Merge Two Sorted Lists
          // Merge two sorted linked lists into a new sorted list.
          public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
              if (l1 == null) return l2;
              if (l2 == null) return l1;
              if (l1.val < l2.val) {
                  l1.next = mergeTwoLists(l1.next, l2);
                  return l1;
              } else {
                  l2.next = mergeTwoLists(l1, l2.next);
                  return l2;
              }
          }
        `
    },
    {
        title: "Generate Parentheses",
        solution: `
          // Problem: Generate Parentheses
          // Generate all combinations of well-formed parentheses.
          public List<String> generateParenthesis(int n) {
              List<String> result = new ArrayList<>();
              generateParenthesisHelper(result, "", 0, 0, n);
              return result;
          }
      
          private void generateParenthesisHelper(List<String> result, String current, int open, int close, int n) {
              if (current.length() == 2 * n) {
                  result.add(current);
                  return;
              }
              if (open < n) {
                  generateParenthesisHelper(result, current + "(", open + 1, close, n);
              }
              if (close < open) {
                  generateParenthesisHelper(result, current + ")", open, close + 1, n);
              }
          }
        `
    },
    {
        title: "Remove Duplicates from Sorted Array",
        solution: `
          // Problem: Remove Duplicates from Sorted Array
          // Remove duplicates in a sorted array and return the length of the new array.
          public int removeDuplicates(int[] nums) {
              if (nums.length == 0) return 0;
              int uniqueIndex = 1;
              for (int i = 1; i < nums.length; i++) {
                  if (nums[i] != nums[i - 1]) {
                      nums[uniqueIndex++] = nums[i];
                  }
              }
              return uniqueIndex;
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
