'use strict'

module.exports = (types) ->
  id:
    type: types.UUID
    defaultValue: types.UUIDV1
    primaryKey: yes
    allowNull: no
  characterId:
    type: types.UUID
    allowNull: no
    field: 'character_id'
  lang:
    type: types.CHAR 5
    allowNull: no
  name:
    type: types.STRING
    allowNull: no
