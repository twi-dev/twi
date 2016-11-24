"use strict"

module.exports = ({UUID, UUIDV1, CHAR, STRING}) ->
  id:
    type: UUID
    defaultValue: UUIDV1
    primaryKey: yes
    allowNull: no
  characterId:
    type: UUID
    allowNull: no
    field: "character_id"
  lang:
    type: CHAR 5
    allowNull: no
  name:
    type: STRING
    allowNull: no
