/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator {
  result = 0;

  add(number) {
    this.result = this.result + number;
  }
  subtract(number) {
    this.result = this.result - number;
  }
  multiply(number) {
    this.result = this.result * number;
  }
  divide(number) {
    this.result = this.result / number;
  }
  clear(number) {
    this.result = 0;
  }
  getResult() {
    return this.result;
  }
  calculate(expression) {
    // Remove any spaces from the expression
    expression = expression.replace(/\s+/g, "");

    if (!checkIfValidExpression(expression)) {
      throw new Error("Unbalanced parentheses in the expression");
    }

    this.result = evaluateExpression(expression);
    return this.result;
  }
}

function evaluateExpression(expression) {
  let values = [];
  let operators = [];
  let i = 0;

  while (i < expression.length) {
    let char = expression[i];

    if (char === "(") {
      operators.push(char);
    } else if (!isNaN(char)) {
      let num = "";
      while (!isNaN(expression[i]) || expression[i] === ".") {
        num += expression[i];
        i++;
      }
      values.push(parseFloat(num));
      continue;
    } else if (char === ")") {
      while (operators.length > 0 && operators[operators.length - 1] != "(") {
        let secondElement = values.pop();
        let fistElement = values.pop();
        let operator = operators.pop();
        values.push(execupeOperation(fistElement, secondElement, operator));
      }
      operators.pop();
    } else {
      while (
        operators.length !== 0 &&
        getPriority(char) <= getPriority(operators[operators.length - 1])
      ) {
        let secondElement = values.pop();
        let firstElement = values.pop();
        let operator = operators.pop();
        values.push(execupeOperation(firstElement, secondElement, operator));
      }
      operators.push(char);
    }
    i++;
  }

  while (operators.length !== 0) {
    let secondElement = values.pop();
    let firstElement = values.pop();
    let operator = operators.pop();
    values.push(execupeOperation(firstElement, secondElement, operator));
  }
  return values[0];
}

function getPriority(operator) {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    default:
      return 0;
  }
}

function execupeOperation(fistElement, secondElement, operator) {
  switch (operator) {
    case "+":
      return fistElement + secondElement;
      break;
    case "-":
      return fistElement - secondElement;
      break;
    case "*":
      return fistElement * secondElement;
      break;
    case "/":
      if(fistElement !== 0 && secondElement !== 0) {
        return fistElement / secondElement;
      } else {
        throw new Error("not able to divide");
      }
      break;

    default:
      break;
  }
}

function checkIfValidExpression(expression) {

  let regExp = /[a-zA-Z]/g;
  if(regExp.test(expression)){
    throw new Error("expression contains invalid characters");
  } 

  let matchStack = 0;
  let open = "(";
  let close = ")";

  for (let element of expression) {
    if (element == open) {
      matchStack++;
    }
    if (element == close && matchStack !== 0) {
      matchStack--;
    }
  }
  if (matchStack == 0) {
    return true;
  } else {
    return false;
  }
}

let calculate = new Calculator();

calculate.calculate("10 - (4 + 2)");
console.log(calculate.getResult());

module.exports = Calculator;
