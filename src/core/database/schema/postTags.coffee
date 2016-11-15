'use strict'

module.exports = (types) ->
  id:
    type: types.UUID
    primaryKey: yes
    defaultValue: types.UUIDV1
    allowNull: no
  postId:
    type: types.UUID
    allowNull: no
    field: 'post_id'
  tagId:
    type: types.UUID
    allowNull: no
    field: 'tag_id'
