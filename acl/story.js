"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ability = require("@casl/ability");

var _Collaborator = _interopRequireDefault(require("../db/model/Collaborator"));

var _Story = _interopRequireDefault(require("../db/model/Story"));

var _User = _interopRequireDefault(require("../db/model/User"));

const getStoryAbilities = members => _ability.AbilityBuilder.define((allow, forbid) => {
  const {
    user,
    collaborator
  } = members;
  allow("read", _Story.default); // Guests must be able to see stories as well, but can't do anything else
  // so just set above delcarations and stop.

  if (!user) {
    return undefined;
  } // Creator can do whatever he want with own story.


  allow("manage", _Story.default, {
    userId: user.id
  }); // Moderators must be able to update only specific fields

  if (user.role === _User.default.roles.moderator) {
    allow("update", _Story.default, ["title", "description", "genres", "characters", "cover"], // This rule important, since moderator also can have own stories,
    // so we need to forbid of managing only ones he doesn't owns
    {
      userId: {
        $ne: user.id
      }
    });
  }

  if (!collaborator) {
    return undefined;
  } // Collaborators must be able to update story fields in general,
  // except its main info


  if (collaborator.role === _Collaborator.default.roles.writer) {
    allow("update", _Story.default);
    forbid("update", _Story.default, ["title", "description", "cover"]);
  }
});

var _default = getStoryAbilities;
exports.default = _default;