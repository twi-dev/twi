'use strict'

module.exports = ({UUID, UUIDV1, STRING}) ->
  characterId:
    type: UUID
    primaryKey: yes
    defaultValue: UUIDV1
    allowNull: no
    field: 'character_id'
  pic:
    type: STRING
    allowNull: no
    unique: yes
