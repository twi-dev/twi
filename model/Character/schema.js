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
  pic: {
    type: t.String,
    required: true
  }
});
var _default = schema;
exports.default = _default;