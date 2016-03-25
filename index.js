var ponyFiction;

ponyFiction = require('./core/init');

ponyFiction().then(function(run) {
  return run();
})["catch"](function(err) {
  return console.log(err);
});
