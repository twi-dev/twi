'use strict'

module.exports = (oTypes) ->
  postId:
    type: oTypes.UUID
    primaryKey: yes
    defaultValue: oTypes.UUIDV1
    allowNull: no
    field: 'post_id'
  userId:
    type: oTypes.UUID
    allowNull: no
    field: 'user_id'
  title:
    type: oTypes.STRING
    allowNull: no
  content:
    type: oTypes.TEXT
    allowNull: no
  createdAt:
    type: oTypes.DATE
    allowNull: no
    defaultValue: oTypes.NOW
    field: 'created_at'
  updatedAt:
    type: oTypes.DATE
    allowNull: yes
    defaultValue: null
    field: 'updated_at'
