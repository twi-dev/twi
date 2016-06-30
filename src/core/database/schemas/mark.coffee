'use strict'

module.exports = (types) ->
  markId:
    type: types.UUID
    primaryKey: yes
    defaultValue: types.UUIDV1
    allowNull: no
    field: 'mark_id'
  code:
    type: types.STRING
    allowNull: no
    unique: yes
  name:
    type: types.STRING
    allowNull: no
    unique: yes
  about:
    type: types.TEXT
    allowNull: yes
