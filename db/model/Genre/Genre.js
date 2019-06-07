"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _nanoid = _interopRequireDefault(require("nanoid"));

var _db = require("../../../core/db");

var _class;

const isArray = Array.isArray; // Set code length to 4

const generateCode = (0, _partial.default)(_nanoid.default, 4);

let Genre = (0, _db.createModel)(_class = class Genre extends _db.Model {
  static createOne(genre, options) {
    genre.code = generateCode();
    return super.createOne(genre, options);
  }

  static createMany(genres, options) {
    if (!isArray(genres)) {
      genres = [genres];
    }

    for (const [idx, genre] of genres.entries()) {
      const code = generateCode();
      genres[idx] = (0, _objectSpread2.default)({}, genre, {
        code
      });
    }

    return super.createMany(genres, options);
  }

}) || _class;

var _default = Genre;
exports.default = _default;