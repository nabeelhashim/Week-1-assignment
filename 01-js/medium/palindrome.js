/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str) {
  let reversedString = "";
  for (let i = str.length; i >= 0; i--) {
    reversedString = reversedString + str.charAt(i);
  }
  if (reversedString.toUpperCase() == str.toUpperCase()) {
    return true;
  } else {
    return false;
  }
}


module.exports = isPalindrome;
