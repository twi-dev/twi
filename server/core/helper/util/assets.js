"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

let getAssets = (() => {
  var _ref = _asyncToGenerator(function* () {
    const assets = JSON.parse(String((yield (0, _promiseFs.readFile)(`${TWI_ROOT}/config/assets.json`))));

    return function (type) {
      return mapAssets(assets, type);
    };
  });

  return function getAssets() {
    return _ref.apply(this, arguments);
  };
})();

var _promiseFs = require("promise-fs");

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isString = require("lodash/isString");

var _isString2 = _interopRequireDefault(_isString);

var _objectIterator = require("./objectIterator");

var _objectIterator2 = _interopRequireDefault(_objectIterator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const TWI_ROOT = process.cwd();

function mapAssets(assets, type) {
  if (!type) {
    throw new TypeError("Asset type cannot be empty.");
  }

  if (!(0, _isString2.default)(type)) {
    throw new TypeError("Asset type should be a string.");
  }

  const res = [];

  for (const bundle of (0, _objectIterator2.default)(assets)) {
    const asset = bundle[type];

    if (!(0, _isEmpty2.default)(asset)) {
      res.push(asset);
    }
  }

  return res;
}

exports.default = getAssets;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9vY3RldHN0cmVhbS9wcm9qZWN0cy90d2kvc3JjL3NlcnZlci9jb3JlL2hlbHBlci91dGlsL2Fzc2V0cy5qcyJdLCJuYW1lcyI6WyJhc3NldHMiLCJKU09OIiwicGFyc2UiLCJTdHJpbmciLCJUV0lfUk9PVCIsIm1hcEFzc2V0cyIsInR5cGUiLCJnZXRBc3NldHMiLCJwcm9jZXNzIiwiY3dkIiwiVHlwZUVycm9yIiwicmVzIiwiYnVuZGxlIiwiYXNzZXQiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OytCQTZCQSxhQUEyQjtBQUN6QixVQUFNQSxTQUFTQyxLQUFLQyxLQUFMLENBQ2JDLFFBQU8sTUFBTSx5QkFBVSxHQUFFQyxRQUFTLHFCQUFyQixDQUFiLEVBRGEsQ0FBZjs7QUFJQSxXQUFPO0FBQUEsYUFBUUMsVUFBVUwsTUFBVixFQUFrQk0sSUFBbEIsQ0FBUjtBQUFBLEtBQVA7QUFDRCxHOztrQkFOY0MsUzs7Ozs7QUE3QmY7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLE1BQU1ILFdBQVdJLFFBQVFDLEdBQVIsRUFBakI7O0FBRUEsU0FBU0osU0FBVCxDQUFtQkwsTUFBbkIsRUFBMkJNLElBQTNCLEVBQWlDO0FBQy9CLE1BQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1QsVUFBTSxJQUFJSSxTQUFKLENBQWMsNkJBQWQsQ0FBTjtBQUNEOztBQUVELE1BQUksQ0FBQyx3QkFBU0osSUFBVCxDQUFMLEVBQXFCO0FBQ25CLFVBQU0sSUFBSUksU0FBSixDQUFjLGdDQUFkLENBQU47QUFDRDs7QUFFRCxRQUFNQyxNQUFNLEVBQVo7O0FBRUEsT0FBSSxNQUFNQyxNQUFWLElBQW9CLDhCQUFlWixNQUFmLENBQXBCLEVBQTRDO0FBQzFDLFVBQU1hLFFBQVFELE9BQU9OLElBQVAsQ0FBZDs7QUFFQSxRQUFJLENBQUMsdUJBQVFPLEtBQVIsQ0FBTCxFQUFxQjtBQUNuQkYsVUFBSUcsSUFBSixDQUFTRCxLQUFUO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPRixHQUFQO0FBQ0Q7O2tCQVVjSixTIiwiZmlsZSI6Ii9Vc2Vycy9vY3RldHN0cmVhbS9wcm9qZWN0cy90d2kvc3JjL3NlcnZlci9jb3JlL2hlbHBlci91dGlsL2Fzc2V0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cmVhZEZpbGV9IGZyb20gXCJwcm9taXNlLWZzXCJcbmltcG9ydCBpc0VtcHR5IGZyb20gXCJsb2Rhc2gvaXNFbXB0eVwiXG5pbXBvcnQgaXNTdHJpbmcgZnJvbSBcImxvZGFzaC9pc1N0cmluZ1wiXG5pbXBvcnQgb2JqZWN0SXRlcmF0b3IgZnJvbSBcIi4vb2JqZWN0SXRlcmF0b3JcIlxuXG5jb25zdCBUV0lfUk9PVCA9IHByb2Nlc3MuY3dkKClcblxuZnVuY3Rpb24gbWFwQXNzZXRzKGFzc2V0cywgdHlwZSkge1xuICBpZiAoIXR5cGUpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXNzZXQgdHlwZSBjYW5ub3QgYmUgZW1wdHkuXCIpXG4gIH1cblxuICBpZiAoIWlzU3RyaW5nKHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFzc2V0IHR5cGUgc2hvdWxkIGJlIGEgc3RyaW5nLlwiKVxuICB9XG5cbiAgY29uc3QgcmVzID0gW11cblxuICBmb3IoY29uc3QgYnVuZGxlIG9mIG9iamVjdEl0ZXJhdG9yKGFzc2V0cykpIHtcbiAgICBjb25zdCBhc3NldCA9IGJ1bmRsZVt0eXBlXVxuXG4gICAgaWYgKCFpc0VtcHR5KGFzc2V0KSkge1xuICAgICAgcmVzLnB1c2goYXNzZXQpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBc3NldHMoKSB7XG4gIGNvbnN0IGFzc2V0cyA9IEpTT04ucGFyc2UoXG4gICAgU3RyaW5nKGF3YWl0IHJlYWRGaWxlKGAke1RXSV9ST09UfS9jb25maWcvYXNzZXRzLmpzb25gKSlcbiAgKVxuXG4gIHJldHVybiB0eXBlID0+IG1hcEFzc2V0cyhhc3NldHMsIHR5cGUpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldEFzc2V0c1xuIl19