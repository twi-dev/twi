"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ability = require("@casl/ability");

var _Story = _interopRequireDefault(require("../db/model/Story"));

var _User = _interopRequireDefault(require("../db/model/User"));

const getStoryAbilities = user => _ability.AbilityBuilder.define(allow => {
  allow("read", _Story.default);
  allow("manage", _Story.default, {
    userId: user.id
  });

  if (user.role === _User.default.roles.moderator) {
    allow(["update", "delete"], _Story.default, ["title", "description"]);
  }
});

var _default = getStoryAbilities;
exports.default = _default;