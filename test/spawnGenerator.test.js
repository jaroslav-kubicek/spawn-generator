'use strict';

let expect = require('chai').expect;
let sampleFuncs = require('./sampleFunctions');
let spawnGenerator = require('../');

describe('spawnGenerator', function () {

  it('should resolve generator function successfully', function () {
    let promised = spawnGenerator(sampleFuncs.generatorFunc);
    expect(promised).to.be.a('function');

    return promised().then(function (res) {
      expect(res).to.be.an('array').that.have.length(2);
    });
  });


  it('should immediately call function when passing additional args', function () {
    let promise = spawnGenerator(sampleFuncs.generatorFunc, 'strawberry');
    expect(promise).to.be.instanceOf(Promise);

    return promise.then(function (fruits) {
      expect(fruits).to.be.an('array').that.includes('STRAWBERRY');
    });
  });


  it('should reject promise if inner promise was also rejected', function () {
    let promised = spawnGenerator(sampleFuncs.rejectingGenFunc);
    return promised().then(function () {
      throw new Error('Promise should not be fulfilled.');
    }).catch(function (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal('All is wrong!');
    });
  });

  it('should reject promise if error is thrown', function () {
    let promised = spawnGenerator(sampleFuncs.failingGenFunc);
    return promised().then(function () {
      throw new Error('Promise should not be fulfilled.');
    }).catch(function (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal('Unexpected error!');
    });
  });

  it('should resolve normal function', function () {
    let promised = spawnGenerator(sampleFuncs.normalFunc)();
    expect(promised).to.be.instanceOf(Promise);

    return promised.then(function (result) {
      expect(result).to.be.equal(1);
    });
  });

  it('should reject if normal function fails', function () {
    let promised = spawnGenerator(sampleFuncs.failingFunc)();
    expect(promised).to.be.instanceOf(Promise);

    return promised.then(function () {
      throw new Error('Promise should not be fulfilled.');
    }).catch(function (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.be.equal('Free failing!');
    });
  });

});