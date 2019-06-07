"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = require("crypto");

var _database = require("../../core/database");

var _schema = _interopRequireDefault(require("./schema"));

var _dec, _class;

let EmailConfirmationToken = (_dec = (0, _database.createModel)(_schema.default), _dec(_class = class EmailConfirmationToken extends _database.Model {
  static findByHash(hash) {
    return this.findOne({
      hash
    });
  }

  static async createOne({
    email,
    id
  }) {
    const payload = `${email}::${Date.now()}`;
    const hash = (0, _crypto.createHash)("sha256").update(payload).digest("hex");
    return super.createOne({
      userId: id,
      email,
      hash
    });
  }

}) || _class);
var _default = EmailConfirmationToken;
exports.default = _default;