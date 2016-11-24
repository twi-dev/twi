"use strict"

module.exports = ({UUID, UUIDV1, STRING}) ->
  tagId:
    type: UUID
    primaryKey: yes
    defaultValue: UUIDV1
    allowNull: no
    field: "tag_id"
  name:
    type: STRING
    allowNull: no
