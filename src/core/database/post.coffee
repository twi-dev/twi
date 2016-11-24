"use strict"

module.exports = ({UUID, UUIDV1, STRING, TEXT, DATE, NOW}) ->
  postId:
    type: UUID
    primaryKey: yes
    defaultValue: UUIDV1
    allowNull: no
    field: "post_id"
  userId:
    type: UUID
    allowNull: no
    field: "user_id"
  title:
    type: STRING
    allowNull: no
  slug:
    type: TEXT
    allowNull: no
  content:
    type: TEXT
    allowNull: no
  renderedContent:
    type: TEXT
    allowNull: no
    field: "rendered_content"
  createdAt:
    type: DATE
    allowNull: no
    defaultValue: NOW
    field: "created_at"
  updatedAt:
    type: DATE
    allowNull: yes
    defaultValue: null
    field: "updated_at"
