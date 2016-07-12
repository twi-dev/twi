'use strict'

module.exports = (types) ->
  id:
    type: types.UUID
    defaultValue: types.UUIDV1
    primaryKey: yes
    allowNull: no
  markId:
    type: types.UUID
    allowNull: no
    field: 'mark_id'
  lang:
    type: types.CHAR 5
    allowNull: no
  name:
    type: types.STRING
    allowNull: no
  about:
    type: types.TEXT
    allowNull: yes
