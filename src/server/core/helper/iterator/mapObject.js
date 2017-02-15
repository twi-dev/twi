"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectIterator = require("./objectIterator");

var _objectIterator2 = _interopRequireDefault(_objectIterator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Map given object with callback and return new one
 *
 * @param object obj – iterable object
 * @param function cb – callback
 * @param any ctx – "this" context that will using with the callback
 */
function mapObject(obj, cb, ctx = null) {
  const res = {};

  for (const [key, value] of _objectIterator2.default.entries(obj)) {
    res[key] = cb.call(ctx, value, key, obj);
  }

  return res;
}

exports.default = mapObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcE9iamVjdC5qcyJdLCJuYW1lcyI6WyJtYXBPYmplY3QiLCJvYmoiLCJjYiIsImN0eCIsInJlcyIsImtleSIsInZhbHVlIiwiZW50cmllcyIsImNhbGwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQTs7Ozs7OztBQU9BLFNBQVNBLFNBQVQsQ0FBbUJDLEdBQW5CLEVBQXdCQyxFQUF4QixFQUE0QkMsTUFBTSxJQUFsQyxFQUF3QztBQUN0QyxRQUFNQyxNQUFNLEVBQVo7O0FBRUEsT0FBSyxNQUFNLENBQUNDLEdBQUQsRUFBTUMsS0FBTixDQUFYLElBQTJCLHlCQUFlQyxPQUFmLENBQXVCTixHQUF2QixDQUEzQixFQUF3RDtBQUN0REcsUUFBSUMsR0FBSixJQUFXSCxHQUFHTSxJQUFILENBQVFMLEdBQVIsRUFBYUcsS0FBYixFQUFvQkQsR0FBcEIsRUFBeUJKLEdBQXpCLENBQVg7QUFDRDs7QUFFRCxTQUFPRyxHQUFQO0FBQ0Q7O2tCQUVjSixTIiwiZmlsZSI6Im1hcE9iamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvYmplY3RJdGVyYXRvciBmcm9tIFwiLi9vYmplY3RJdGVyYXRvclwiXG5cbi8qKlxuICogTWFwIGdpdmVuIG9iamVjdCB3aXRoIGNhbGxiYWNrIGFuZCByZXR1cm4gbmV3IG9uZVxuICpcbiAqIEBwYXJhbSBvYmplY3Qgb2JqIOKAkyBpdGVyYWJsZSBvYmplY3RcbiAqIEBwYXJhbSBmdW5jdGlvbiBjYiDigJMgY2FsbGJhY2tcbiAqIEBwYXJhbSBhbnkgY3R4IOKAkyBcInRoaXNcIiBjb250ZXh0IHRoYXQgd2lsbCB1c2luZyB3aXRoIHRoZSBjYWxsYmFja1xuICovXG5mdW5jdGlvbiBtYXBPYmplY3Qob2JqLCBjYiwgY3R4ID0gbnVsbCkge1xuICBjb25zdCByZXMgPSB7fVxuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIG9iamVjdEl0ZXJhdG9yLmVudHJpZXMob2JqKSkge1xuICAgIHJlc1trZXldID0gY2IuY2FsbChjdHgsIHZhbHVlLCBrZXksIG9iailcbiAgfVxuXG4gIHJldHVybiByZXNcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwT2JqZWN0XG4iXX0=