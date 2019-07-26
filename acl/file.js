"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ability = require("@casl/ability");

var _File = _interopRequireDefault(require("../db/model/File"));

const getFileAbilities = user => _ability.AbilityBuilder.define(allow => {
  allow("read", _File.default);
  allow("manage", _File.default, {
    userId: user.id
  });
});

var _default = getFileAbilities;
exports.default = _default;