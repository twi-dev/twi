"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Simplest object iterator which I can imagine :D
 *
 * @param object obj
 * @param boolean entries
 *
 * @yields any|array
 */
function* objectIterator(obj, entries = false) {
  const keys = Object.keys(obj);

  for (const key of keys) {
    const value = obj[key];

    yield entries ? [key, value] : value;
  }
}

const entries = obj => objectIterator(obj, true);

objectIterator.entries = entries;
exports.entries = entries;
exports.default = objectIterator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9iamVjdEl0ZXJhdG9yLmpzIl0sIm5hbWVzIjpbIm9iamVjdEl0ZXJhdG9yIiwib2JqIiwiZW50cmllcyIsImtleXMiLCJPYmplY3QiLCJrZXkiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7Ozs7QUFRQSxVQUFVQSxjQUFWLENBQXlCQyxHQUF6QixFQUE4QkMsVUFBVSxLQUF4QyxFQUErQztBQUM3QyxRQUFNQyxPQUFPQyxPQUFPRCxJQUFQLENBQVlGLEdBQVosQ0FBYjs7QUFFQSxPQUFLLE1BQU1JLEdBQVgsSUFBa0JGLElBQWxCLEVBQXdCO0FBQ3RCLFVBQU1HLFFBQVFMLElBQUlJLEdBQUosQ0FBZDs7QUFFQSxVQUFNSCxVQUFVLENBQUNHLEdBQUQsRUFBTUMsS0FBTixDQUFWLEdBQXlCQSxLQUEvQjtBQUNEO0FBQ0Y7O0FBRUQsTUFBTUosVUFBVUQsT0FBT0QsZUFBZUMsR0FBZixFQUFvQixJQUFwQixDQUF2Qjs7QUFFQUQsZUFBZUUsT0FBZixHQUF5QkEsT0FBekI7UUFDUUEsTyxHQUFBQSxPO2tCQUNPRixjIiwiZmlsZSI6Im9iamVjdEl0ZXJhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTaW1wbGVzdCBvYmplY3QgaXRlcmF0b3Igd2hpY2ggSSBjYW4gaW1hZ2luZSA6RFxuICpcbiAqIEBwYXJhbSBvYmplY3Qgb2JqXG4gKiBAcGFyYW0gYm9vbGVhbiBlbnRyaWVzXG4gKlxuICogQHlpZWxkcyBhbnl8YXJyYXlcbiAqL1xuZnVuY3Rpb24qIG9iamVjdEl0ZXJhdG9yKG9iaiwgZW50cmllcyA9IGZhbHNlKSB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopXG5cbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleV1cblxuICAgIHlpZWxkIGVudHJpZXMgPyBba2V5LCB2YWx1ZV0gOiB2YWx1ZVxuICB9XG59XG5cbmNvbnN0IGVudHJpZXMgPSBvYmogPT4gb2JqZWN0SXRlcmF0b3Iob2JqLCB0cnVlKVxuXG5vYmplY3RJdGVyYXRvci5lbnRyaWVzID0gZW50cmllc1xuZXhwb3J0IHtlbnRyaWVzfVxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0SXRlcmF0b3JcbiJdfQ==