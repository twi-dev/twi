"use strict";
var exec, linkTwi, migrate, ora, pify, setup,
  asyncWrap = (function(){ return function(fn) { return function() { var gen = fn.apply(this, arguments); return new Promise(function(resolve, reject) { function onFulfilled(res) { try { var nextYield = gen.next(res); } catch (err) { return reject(err); } next(nextYield); } function onRejeted(err) { try { var nextYield = gen.throw(err); } catch (err) { return reject(err); } next(nextYield); } function next(nextYield) { if (nextYield.done) { return resolve(nextYield.value); } var value = nextYield.value; return Promise.resolve(value).then(onFulfilled, onRejeted); } return onFulfilled(); }); }; }; })();

pify = require("pify");

migrate = require("./migrate");

exec = pify(require("child_process")).exec;

ora = require("ora")();

linkTwi = asyncWrap(function*() {
  var err;
  try {
    return (yield exec("which twi"));
  } catch (error) {
    err = error;
    return process.stdout.write(String((yield exec("npm link"))));
  }
});

setup = asyncWrap(function*(cmd) {
  if (!cmd.S) {
    console.log("Silent mode is off");
  }
  yield migrate(cmd);
  return (yield linkTwi());
});

module.exports = setup;
