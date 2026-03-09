 
    - 1️⃣ What is the difference between var, let, and const?
    - 2️⃣ What is the spread operator (...)?
    - 3️⃣ What is the difference between map(), filter(), and forEach()?
    - 4️⃣ What is an arrow function?
    - 5️⃣ What are template literals?

1️⃣ What is the difference between var, let, and const?

var, let, and const are used to declare variables in JavaScript, but they behave differently.

var is the old way of declaring variables. It is function-scoped and can be redeclared and updated.

let is block-scoped. It can be updated but cannot be redeclared in the same scope.

const is also block-scoped, but its value cannot be reassigned after it is declared.

Example:

var a = 10;
let b = 20;
const c = 30;

2️⃣ What is the spread operator (...)?

The spread operator (...) is used to expand or spread elements of an array or object into individual elements.

It helps to copy, merge, or combine arrays and objects easily.

Example with array:

const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];


3️⃣ What is the difference between map(), filter(), and forEach()?

These are array methods used to work with array data.

map()

Creates a new array by transforming each element.

The original array remains unchanged.

Example:

const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);

filter()

Creates a new array with elements that match a condition.

Example:

const numbers = [1, 2, 3, 4];
const even = numbers.filter(num => num % 2 === 0);

forEach()

Runs a function for each array element.

It does not return a new array.

Example:

numbers.forEach(num => {
  console.log(num);
});


4️⃣ What is an arrow function?

An arrow function is a shorter way to write a function in JavaScript. It uses the => syntax.

It makes the code cleaner and easier to read.

Example:

Normal function:

function add(a, b) {
  return a + b;
}

Arrow function:

const add = (a, b) => a + b;

5️⃣ What are template literals?

Template literals are used to create strings with embedded variables. They use backticks (`) instead of single or double quotes.

They allow you to insert variables directly into a string using ${}.

Example:

const name = "Shawon";
const message = `Hello, my name is ${name}`;