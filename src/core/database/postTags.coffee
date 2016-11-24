"use strict"

module.exports = ({UUID, UUIDV1}) ->
  id:
    type: UUID
    primaryKey: yes
    defaultValue: UUIDV1
    allowNull: no
  postId:
    type: UUID
    allowNull: no
    field: "post_id"
  tagId:
    type: UUID
    allowNull: no
    field: "tag_id"
