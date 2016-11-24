"use strict"

module.exports = ({UUID, UUIDV1, CHAR, STRING, TEXT}) ->
  id:
    type: UUID
    defaultValue: UUIDV1
    primaryKey: yes
    allowNull: no
  markId:
    type: UUID
    allowNull: no
    field: "mark_id"
  lang:
    type: CHAR 5
    allowNull: no
  name:
    type: STRING
    allowNull: no
  about:
    type: TEXT
    allowNull: yes
