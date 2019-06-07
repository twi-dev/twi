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
  hash: {
    payload: t.String,
    required: true,
    unique: true
  },
  userId: {
    type: t.ObjectId,
    required: true,
    ref: "User"
  },
  createdAt: {
    type: t.Date,
    required: true,
    default: Date.now,
    index: {
      expires: "1 day"
    }
  }
});
var _default = schema;
exports.default = _default;
//# sourceMappingURL=schema.js.map