'use strict'

module.exports = (oTypes) ->
  characterId:
    type: oTypes.UUID
    primaryKey: yes
    defaultValue: oTypes.UUIDV1
    allowNull: no
    field: 'character_id'
  code:
    type: oTypes.TEXT
    allowNull: no
    unique: yes
  name:
    type: oTypes.STRING
    allowNull: no
  pic:
    type: oTypes.STRING
    allowNull: yes
