'use strict';

exports.generatorFunc = function*(fruit) {
  let fruits = [];
  fruits.push(yield _asyncMethod('apple'));
  fruits.push(yield _asyncMethod('banana'));
  if (fruit) {
    fruits.push(yield _asyncMethod(fruit));
  }
  return fruits;
};

exports.rejectingGenFunc = function*() {
  yield 'Normal Value';
  return Promise.reject(new Error('All is wrong!'));
};

exports.failingGenFunc = function* () {
  throw new Error('Unexpected error!');
};

exports.normalFunc = function () {
  return 1;
};

exports.failingFunc = function () {
  throw new Error('Free failing!');
};

let _asyncMethod = function (fruit) {
  let delayedFn = (resolve) => resolve(fruit.toUpperCase());

  return new Promise((resolve) => setTimeout(delayedFn, 1, resolve));
};
