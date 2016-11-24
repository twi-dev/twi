"use strict"

module.exports = ({UUID, UUIDV1, CHAR}) ->
  markId:
    type: UUID
    primaryKey: yes
    defaultValue: UUIDV1
    allowNull: no
    field: "mark_id"
  color:
    type: CHAR 6
    allowNull: yes
    unique: yes
