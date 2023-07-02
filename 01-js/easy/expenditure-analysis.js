/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  let outputArray = [];
  let categoryArray = [];
  let outputObject = {};

  for (let i = 0; i < transactions.length; i++) {
    if (!categoryArray.includes(transactions[i].category)) {
      categoryArray.push(transactions[i].category);
      outputObject = {
        category: transactions[i].category,
        totalSpent: transactions[i].price
      }
      outputArray.push(outputObject);
    } else {
      for (let j = 0; j < outputArray.length; j++) {
        if (transactions[i].category == outputArray[j].category) {
          outputArray[j].totalSpent = outputArray[j].totalSpent + transactions[i].price;
        }
      }
    }
  } 
  console.log(outputArray);
  return outputArray;
}

module.exports = calculateTotalSpentByCategory;
