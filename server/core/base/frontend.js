"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assets = require("../helper/util/assets");

var _assets2 = _interopRequireDefault(_assets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Just serve app comtainer
const actionIndex = (() => {
  var _ref = _asyncToGenerator(function* (ctx) {
    return yield ctx.render("layout/root", {
      getAssets: yield (0, _assets2.default)()
    });
  });

  return function actionIndex(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = actionIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9vY3RldHN0cmVhbS9wcm9qZWN0cy90d2kvc3JjL3NlcnZlci9jb3JlL2Jhc2UvZnJvbnRlbmQuanMiXSwibmFtZXMiOlsiYWN0aW9uSW5kZXgiLCJjdHgiLCJyZW5kZXIiLCJnZXRBc3NldHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7OztBQUVBO0FBQ0EsTUFBTUE7QUFBQSwrQkFBYyxXQUFNQyxHQUFOO0FBQUEsV0FBYSxNQUFNQSxJQUFJQyxNQUFKLENBQVcsYUFBWCxFQUEwQjtBQUMvREMsaUJBQVcsTUFBTTtBQUQ4QyxLQUExQixDQUFuQjtBQUFBLEdBQWQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBTjs7a0JBSWVILFciLCJmaWxlIjoiL1VzZXJzL29jdGV0c3RyZWFtL3Byb2plY3RzL3R3aS9zcmMvc2VydmVyL2NvcmUvYmFzZS9mcm9udGVuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NldHMgZnJvbSBcImNvcmUvaGVscGVyL3V0aWwvYXNzZXRzXCJcblxuLy8gSnVzdCBzZXJ2ZSBhcHAgY29tdGFpbmVyXG5jb25zdCBhY3Rpb25JbmRleCA9IGFzeW5jIGN0eCA9PiBhd2FpdCBjdHgucmVuZGVyKFwibGF5b3V0L3Jvb3RcIiwge1xuICBnZXRBc3NldHM6IGF3YWl0IGFzc2V0cygpXG59KVxuXG5leHBvcnQgZGVmYXVsdCBhY3Rpb25JbmRleFxuIl19