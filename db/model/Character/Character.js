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

var _schema = _interopRequireDefault(require("./schema"));

var _dec, _class;

const isArray = Array.isArray; // Set code length to 4

const generateCode = (0, _partial.default)(_nanoid.default, 4);
let Character = (_dec = (0, _db.createModel)(_schema.default), _dec(_class = class Character extends _db.Model {
  static createOne(character, options) {
    character.code = generateCode();
    return super.createOne(character, options);
  }

  static async createMany(characters, options) {
    if (!isArray(characters)) {
      characters = [characters];
    }

    for (const [idx, character] of characters.entries()) {
      const code = generateCode();
      characters[idx] = (0, _objectSpread2.default)({}, character, {
        code
      });
    }

    return super.createMany(characters, options);
  }

}) || _class);
var _default = Character;
exports.default = _default;
//# sourceMappingURL=Character.js.map