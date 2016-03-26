# spawn-generator
Write the synchronous-like code with promises and generators

[![Coverage Status](https://coveralls.io/repos/github/jaroslav-kubicek/spawn-generator/badge.svg?branch=master)](https://coveralls.io/github/jaroslav-kubicek/spawn-generator?branch=master)
[![Build Status](https://travis-ci.org/romadur-js/romadur.svg?branch=master)](https://travis-ci.org/romadur-js/romadur)

## Example

```js
let spawnGenerator = require('spawn-generator');

let generatorFunction = function*(fruit) {
  let fruits = [];
  fruits.push(yield asyncMethod('apple')); // asyncMethod returns Promise
  fruits.push(yield asyncMethod(fruit));
  return fruits;
};

let functionToCall = spawnGenerator(generatorFunction);
functionToCall('banana')
  .then(
    (fruits) => console.log(fruits) // outputs ['apple', 'banana']
  );

spawnGenerator(generatorFunction, 'orange')
  .then(
    (fruits) => console.log(fruits) // outputs ['apple', 'orange']
  );
```
