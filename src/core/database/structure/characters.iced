'use strict'

module.exports = (oTypes) ->
  characterId:
    type: oTypes.INTEGER
    primaryKey: yes
    allowNull: no
    autoIncrement: on
  groupId:
    type: oTypes.INTEGER
    allowNull: no
  name:
    type: oTypes.STRING
    allowNull: no
  pic:
    type: oTypes.STRING
    allowNull: yes
  bio:
    type: oTypes.TEXT
    allowNull: yes
