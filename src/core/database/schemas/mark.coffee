'use strict'

module.exports = (oTypes) ->
  markId:
    type: oTypes.UUID
    primaryKey: yes
    defaultValue: oTypes.UUIDV1
    allowNull: no
    field: 'mark_id'
  name:
    type: oTypes.STRING
    allowNull: no
    unique: yes
  about:
    type: oTypes.TEXT
    allowNull: yes
