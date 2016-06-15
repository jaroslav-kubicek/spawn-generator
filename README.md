# spawn-generator
Write the synchronous-like code with promises and generators

[![Coverage Status](https://coveralls.io/repos/github/jaroslav-kubicek/spawn-generator/badge.svg?branch=master)](https://coveralls.io/github/jaroslav-kubicek/spawn-generator?branch=master)
[![Build Status](https://travis-ci.org/romadur-js/romadur.svg?branch=master)](https://travis-ci.org/romadur-js/romadur)

## Example

```js
const spawnGenerator = require('spawn-generator');

const asyncFunction = function (fruit) {
  return Promise.resolve(fruit);
};

const generatorFunction = function*(fruit) {
  let fruits = [];
  fruits.push(yield asyncFunction('apple')); // function "asyncFunction" returns Promise, see above
  fruits.push(yield asyncFunction(fruit));
  return fruits;
};

const functionToCall = spawnGenerator(generatorFunction);

functionToCall('banana')
  .then((fruits) => console.log(fruits)); // outputs ['apple', 'banana']

// immediately execute generator function when passing more than one parameter to spawnGenerator
spawnGenerator(generatorFunction, 'orange')
  .then((fruits) => console.log(fruits)); // outputs ['apple', 'orange']
```
