'use strict'

module.exports = (oTypes) ->
  tagId:
    type: oTypes.UUID
    primaryKey: yes
    defaultValue: oTypes.UUIDV1
    allowNull: no
    field: 'tag_id'
  name:
    type: oTypes.STRING
    allowNull: no
  about:
    type: oTypes.TEXT
    allowNull: yes
    defaultValue: null
