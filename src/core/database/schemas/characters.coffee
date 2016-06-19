'use strict'

module.exports = (oTypes) ->
  characterId:
    type: oTypes.UUID
    primaryKey: yes
    defaultValue: oTypes.UUIDV1
    allowNull: no
    field: 'character_id'
  groupId:
    type: oTypes.UUID
    allowNull: no
    field: 'group_id'
  name:
    type: oTypes.STRING
    allowNull: no
  pic:
    type: oTypes.STRING
    allowNull: yes
  bio:
    type: oTypes.TEXT
    allowNull: yes
