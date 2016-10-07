'use strict'

module.exports = (types) ->
  characterId:
    type: types.UUID
    primaryKey: yes
    defaultValue: types.UUIDV1
    allowNull: no
    field: 'character_id'
  pic:
    type: types.STRING
    allowNull: no
    unique: yes
