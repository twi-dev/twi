'use strict'

module.exports = (types) ->
  tagId:
    type: types.UUID
    primaryKey: yes
    defaultValue: types.UUIDV1
    allowNull: no
    field: 'tag_id'
  name:
    type: types.STRING
    allowNull: no
