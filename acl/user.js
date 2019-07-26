"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ability = require("@casl/ability");

var _User = _interopRequireDefault(require("../db/model/User"));

const getUserAbilities = user => _ability.AbilityBuilder.define((allow, forbid) => {
  allow("read", "all");

  if (user.status === _User.default.statuses.banned) {
    forbid("manage", "all");
  }

  if (user.role === _User.default.roles.super) {
    allow("manage", "all");
  }
});

var _default = getUserAbilities;
exports.default = _default;