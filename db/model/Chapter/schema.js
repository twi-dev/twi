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
  title: {
    type: t.String,
    required: true
  },
  // TODO: Move contents storage to a file on external static server.
  content: {
    original: {
      type: t.String,
      required: true
    },
    rendered: {
      type: t.String,
      required: true
    }
  },
  dates: {
    createdAt: {
      type: t.Date,
      default: Date.now
    },
    updatedAt: {
      type: t.Date,
      default: Date.now
    }
  }
});
var _default = schema;
exports.default = _default;