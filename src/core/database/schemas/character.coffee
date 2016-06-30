'use strict'

module.exports = (types) ->
  characterId:
    type: types.UUID
    primaryKey: yes
    defaultValue: types.UUIDV1
    allowNull: no
    field: 'character_id'
  code:
    type: types.STRING
    allowNull: no
    unique: yes
  name:
    type: types.STRING
    allowNull: no
  pic:
    type: types.STRING
    allowNull: yes
