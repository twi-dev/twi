"use strict"

module.exports = ({UUID, UUIDV1, INTEGER}) ->
  id:
    type: UUID
    defaultValue: UUIDV1
    primaryKey: yes
    allowNull: no
  serieId:
    type: UUID
    allowNull: no
    field: "serie_id"
  storyId:
    type: UUID
    allowNull: no
    field: "story_id"
  number:
    type: INTEGER
    allowNull: yes
    defaultValue: null
