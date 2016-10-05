"use strict";
var clean, execSync, linkTwi, migrate, silent,
  asyncWrap = (function(){ return function(fn) { return function() { var gen = fn.apply(this, arguments); return new Promise(function(resolve, reject) { function onFulfilled(res) { try { var nextYield = gen.next(res); } catch (err) { return reject(err); } next(nextYield); } function onRejeted(err) { try { var nextYield = gen.throw(err); } catch (err) { return reject(err); } next(nextYield); } function next(nextYield) { if (nextYield.done) { return resolve(nextYield.value); } var value = nextYield.value; return Promise.resolve(value).then(onFulfilled, onRejeted); } return onFulfilled(); }); }; }; })();

execSync = require("child_process").execSync;

migrate = require("./migrate");

linkTwi = function() {
  var err;
  try {
    return execSync("which twi");
  } catch (error) {
    err = error;
    return process.stdout.write(String(execSync("npm link")));
  }
};

clean = function() {};

silent = asyncWrap(function*(clean) {
  if (clean == null) {
    clean = false;
  }
  migrate(clean);
  linkTwi();
});

module.exports = {
  silent: silent
};
