'use strict';

let spawnGenerator = function (generatorFunction) {
  let fn = function () {

    // passed function is not generator, call it directly
    if (generatorFunction.constructor.name !== 'GeneratorFunction') {
      try {
        return Promise.resolve(generatorFunction.apply(this, arguments));
      } catch (e) {
        return Promise.reject(e);
      }
    }

    let generator = generatorFunction.apply(this, arguments);

    let handleYield = function (result) {
      if (result.done) {
        return Promise.resolve(result.value);
      }

      return Promise.resolve(result.value).then(
        function (res) {
          return handleYield(generator.next(res));
        },
        function (err) {
          return handleYield(generator.throw(err));
        }
      );
    };

    try {
      return handleYield(generator.next());
    } catch (e) {
      return Promise.reject(e);
    }
  };

  if (arguments.length > 1) {
    let args = Array.prototype.slice.call(arguments, 1);
    return fn.apply(this, args);
  }

  return fn;
};

module.exports = spawnGenerator;
