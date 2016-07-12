'use strict'

module.exports = (types) ->
  markId:
    type: types.UUID
    primaryKey: yes
    defaultValue: types.UUIDV1
    allowNull: no
    field: 'mark_id'
  color:
    type: types.CHAR 6
    allowNull: yes
    unique: yes
