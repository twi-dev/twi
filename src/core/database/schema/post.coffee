"use strict"

module.exports = (types) ->
  postId:
    type: types.UUID
    primaryKey: yes
    defaultValue: types.UUIDV1
    allowNull: no
    field: "post_id"
  userId:
    type: types.UUID
    allowNull: no
    field: "user_id"
  title:
    type: types.STRING
    allowNull: no
  slug:
    type: types.TEXT
    allowNull: no
  content:
    type: types.TEXT
    allowNull: no
  renderedContent:
    type: types.TEXT
    allowNull: no
    field: "rendered_content"
  createdAt:
    type: types.DATE
    allowNull: no
    defaultValue: types.NOW
    field: "created_at"
  updatedAt:
    type: types.DATE
    allowNull: yes
    defaultValue: null
    field: "updated_at"
