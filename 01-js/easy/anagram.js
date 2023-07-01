/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(str1, str2) {
  if (str1.length != str2.length) {

    return(false);
    
  } else {
    let matchIndex = 0;
    for(let i = 0; i < str1.length; i++) {
      var matchRate = 0;
      for (let j = 0; j < str1.length; j++) {
        if (str1.charAt(i) == str2.charAt(j)) {
          matchRate++;
        }
      }
      let letterCount = countOccurance(str1.charAt(i), str1);
      if(matchRate > 0 && matchRate == letterCount) {
        matchIndex++;
      }
    }
    if (matchIndex == str1.length) {
      return true;
    } else {
      return false;
    }
  }
}

function countOccurance(letter, Str) {
  let count = 0;
  for (let i = 0; i < Str.length; i++) {
    if (letter == Str.charAt(i)) {
      count++;
    }
  }
  return count;
}

module.exports = isAnagram;
