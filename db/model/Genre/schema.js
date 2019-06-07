"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const {
  Schema
} = _mongoose.default;
const {
  Types: t
} = Schema;
const schema = new Schema({
  name: {
    type: t.String,
    required: true
  },
  code: {
    type: t.String,
    required: true,
    unique: true
  },
  color: {
    type: t.String,
    required: true,
    unique: true,
    validate: {
      validator: val => /^(#|0x)([0-9a-f]{6}|[0-9a-f]{3})$/i.test(val),
      message: "Wrong color format for value: {VALUE}"
    }
  }
});
var _default = schema;
exports.default = _default;
//# sourceMappingURL=schema.js.map