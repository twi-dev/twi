"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

let getServer = (() => {
  var _ref = _asyncToGenerator(function* (koa, secure) {
    if (!secure) {
      const { createServer } = require("createServer");

      return createServer(koa.callback());
    }

    const CERTS_ROOT = yield (0, _promiseFs.realpath)(`${process.cwd()}/config/cert`);

    const key = yield (0, _promiseFs.readFile)(`${CERTS_ROOT}/twi.key`);
    const cert = yield (0, _promiseFs.readFile)(`${CERTS_ROOT}/twi.crt`);

    const { createServer } = require("http2");

    return createServer(koa.callback(), { key, cert });
  });

  return function getServer(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let runApp = (() => {
  var _ref2 = _asyncToGenerator(function* (isDev) {
    for (const [name, server] of _objectIterator2.default.entries(servers)) {
      if (isDev && name === "static") {
        continue;
      }

      yield runServer(server);
    }
  });

  return function runApp(_x3) {
    return _ref2.apply(this, arguments);
  };
})();

var _promiseFs = require("promise-fs");

var _objectIterator = require("../../../core/helper/util/objectIterator");

var _objectIterator2 = _interopRequireDefault(_objectIterator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const servers = {};

const runServer = config => new Promise(function (resolve, reject) {
  const { app, host, port, secure, msg } = config;

  const onServer = server => server.on("error", reject).listen("port", () => resolve(console.log(msg)));

  getServer(app, secure).then(onServer, reject);
});

exports.default = runApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9vY3RldHN0cmVhbS9wcm9qZWN0cy90d2kvc3JjL3NlcnZlci9jb3JlL2Jhc2UvbWFpbi5qcyJdLCJuYW1lcyI6WyJrb2EiLCJzZWN1cmUiLCJjcmVhdGVTZXJ2ZXIiLCJyZXF1aXJlIiwiY2FsbGJhY2siLCJDRVJUU19ST09UIiwicHJvY2VzcyIsImN3ZCIsImtleSIsImNlcnQiLCJnZXRTZXJ2ZXIiLCJpc0RldiIsIm5hbWUiLCJzZXJ2ZXIiLCJlbnRyaWVzIiwic2VydmVycyIsInJ1blNlcnZlciIsInJ1bkFwcCIsImNvbmZpZyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYXBwIiwiaG9zdCIsInBvcnQiLCJtc2ciLCJvblNlcnZlciIsIm9uIiwibGlzdGVuIiwiY29uc29sZSIsImxvZyIsInRoZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7K0JBS0EsV0FBeUJBLEdBQXpCLEVBQThCQyxNQUE5QixFQUFzQztBQUNwQyxRQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYLFlBQU0sRUFBQ0MsWUFBRCxLQUFpQkMsUUFBUSxjQUFSLENBQXZCOztBQUVBLGFBQU9ELGFBQWFGLElBQUlJLFFBQUosRUFBYixDQUFQO0FBQ0Q7O0FBRUQsVUFBTUMsYUFBYSxNQUFNLHlCQUFVLEdBQUVDLFFBQVFDLEdBQVIsRUFBYyxjQUExQixDQUF6Qjs7QUFFQSxVQUFNQyxNQUFNLE1BQU0seUJBQVUsR0FBRUgsVUFBVyxVQUF2QixDQUFsQjtBQUNBLFVBQU1JLE9BQU8sTUFBTSx5QkFBVSxHQUFFSixVQUFXLFVBQXZCLENBQW5COztBQUVBLFVBQU0sRUFBQ0gsWUFBRCxLQUFpQkMsUUFBUSxPQUFSLENBQXZCOztBQUVBLFdBQU9ELGFBQWFGLElBQUlJLFFBQUosRUFBYixFQUE2QixFQUFDSSxHQUFELEVBQU1DLElBQU4sRUFBN0IsQ0FBUDtBQUNELEc7O2tCQWZjQyxTOzs7Ozs7Z0NBK0JmLFdBQXNCQyxLQUF0QixFQUE2QjtBQUMzQixTQUFLLE1BQU0sQ0FBQ0MsSUFBRCxFQUFPQyxNQUFQLENBQVgsSUFBNkIseUJBQWVDLE9BQWYsQ0FBdUJDLE9BQXZCLENBQTdCLEVBQThEO0FBQzVELFVBQUlKLFNBQVNDLFNBQVMsUUFBdEIsRUFBZ0M7QUFDOUI7QUFDRDs7QUFFRCxZQUFNSSxVQUFVSCxNQUFWLENBQU47QUFDRDtBQUNGLEc7O2tCQVJjSSxNOzs7OztBQXBDZjs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNRixVQUFVLEVBQWhCOztBQW1CQSxNQUFNQyxZQUFZRSxVQUFVLElBQUlDLE9BQUosQ0FBWSxVQUFTQyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQjtBQUNoRSxRQUFNLEVBQUNDLEdBQUQsRUFBTUMsSUFBTixFQUFZQyxJQUFaLEVBQWtCdkIsTUFBbEIsRUFBMEJ3QixHQUExQixLQUFpQ1AsTUFBdkM7O0FBRUEsUUFBTVEsV0FBV2IsVUFDZkEsT0FDR2MsRUFESCxDQUNNLE9BRE4sRUFDZU4sTUFEZixFQUVHTyxNQUZILENBRVUsTUFGVixFQUVrQixNQUFNUixRQUNwQlMsUUFBUUMsR0FBUixDQUFZTCxHQUFaLENBRG9CLENBRnhCLENBREY7O0FBUUFmLFlBQVVZLEdBQVYsRUFBZXJCLE1BQWYsRUFBdUI4QixJQUF2QixDQUE0QkwsUUFBNUIsRUFBc0NMLE1BQXRDO0FBQ0QsQ0FaMkIsQ0FBNUI7O2tCQXdCZUosTSIsImZpbGUiOiIvVXNlcnMvb2N0ZXRzdHJlYW0vcHJvamVjdHMvdHdpL3NyYy9zZXJ2ZXIvY29yZS9iYXNlL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3JlYWxwYXRoLCByZWFkRmlsZX0gZnJvbSBcInByb21pc2UtZnNcIlxuaW1wb3J0IG9iamVjdEl0ZXJhdG9yIGZyb20gXCJjb3JlL2hlbHBlci91dGlsL29iamVjdEl0ZXJhdG9yXCJcblxuY29uc3Qgc2VydmVycyA9IHt9XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlcihrb2EsIHNlY3VyZSkge1xuICBpZiAoIXNlY3VyZSkge1xuICAgIGNvbnN0IHtjcmVhdGVTZXJ2ZXJ9ID0gcmVxdWlyZShcImNyZWF0ZVNlcnZlclwiKVxuXG4gICAgcmV0dXJuIGNyZWF0ZVNlcnZlcihrb2EuY2FsbGJhY2soKSlcbiAgfVxuXG4gIGNvbnN0IENFUlRTX1JPT1QgPSBhd2FpdCByZWFscGF0aChgJHtwcm9jZXNzLmN3ZCgpfS9jb25maWcvY2VydGApXG5cbiAgY29uc3Qga2V5ID0gYXdhaXQgcmVhZEZpbGUoYCR7Q0VSVFNfUk9PVH0vdHdpLmtleWApXG4gIGNvbnN0IGNlcnQgPSBhd2FpdCByZWFkRmlsZShgJHtDRVJUU19ST09UfS90d2kuY3J0YClcblxuICBjb25zdCB7Y3JlYXRlU2VydmVyfSA9IHJlcXVpcmUoXCJodHRwMlwiKVxuXG4gIHJldHVybiBjcmVhdGVTZXJ2ZXIoa29hLmNhbGxiYWNrKCksIHtrZXksIGNlcnR9KVxufVxuXG5jb25zdCBydW5TZXJ2ZXIgPSBjb25maWcgPT4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gIGNvbnN0IHthcHAsIGhvc3QsIHBvcnQsIHNlY3VyZSwgbXNnfSA9IGNvbmZpZ1xuXG4gIGNvbnN0IG9uU2VydmVyID0gc2VydmVyID0+IChcbiAgICBzZXJ2ZXJcbiAgICAgIC5vbihcImVycm9yXCIsIHJlamVjdClcbiAgICAgIC5saXN0ZW4oXCJwb3J0XCIsICgpID0+IHJlc29sdmUoXG4gICAgICAgIGNvbnNvbGUubG9nKG1zZylcbiAgICAgICkpXG4gIClcblxuICBnZXRTZXJ2ZXIoYXBwLCBzZWN1cmUpLnRoZW4ob25TZXJ2ZXIsIHJlamVjdClcbn0pXG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bkFwcChpc0Rldikge1xuICBmb3IgKGNvbnN0IFtuYW1lLCBzZXJ2ZXJdIG9mIG9iamVjdEl0ZXJhdG9yLmVudHJpZXMoc2VydmVycykpIHtcbiAgICBpZiAoaXNEZXYgJiYgbmFtZSA9PT0gXCJzdGF0aWNcIikge1xuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBhd2FpdCBydW5TZXJ2ZXIoc2VydmVyKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bkFwcFxuIl19