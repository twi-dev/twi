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
  userId: {
    type: t.ObjectId,
    required: true,
    ref: "User"
  },
  client: {
    name: {
      type: t.String,
      required: true
    },
    os: {
      type: t.String,
      required: true
    },
    ip: {
      type: t.String,
      required: true
    }
  },
  dates: {
    signedAt: {
      type: t.Date,
      required: true,
      default: Date.now
    },
    updatedAt: {
      type: t.Date,
      required: true,
      default: Date.now,
      index: {
        expired: "1 year"
      }
    }
  },
  tokenUUID: {
    type: t.String,
    required: true,
    unique: true
  }
});
var _default = schema;
exports.default = _default;