"use strict"

module.exports = ({UUID, UUIDV1}) ->
  id:
    type: UUID
    defaultValue: UUIDV1
    primaryKey: yes
    allowNull: no
  storyId:
    type: UUID
    allowNull: no
    field: "story_id"
  characterId:
    type: UUID
    allowNull: no
    field: "character_id"
