'use strict'

module.exports = (oTypes) ->
  id:
    type: oTypes.UUID
    primaryKey: yes
    defaultValue: oTypes.UUIDV1
    allowNull: no
  postId:
    type: oTypes.UUID
    allowNull: no
    field: 'post_id'
  tagId:
    type: oTypes.UUID
    allowNull: no
    field: 'tag_id'
