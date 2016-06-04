'use strict'

module.exports = (oTypes) ->
  postId:
    type: oTypes.INTEGER
    primaryKey: yes
    allowNull: no
    autoIncrement: on
  userId:
    type: oTypes.INTEGER
    allowNull: no
  title:
    type: oTypes.STRING
    allowNull: no
  content:
    type: oTypes.TEXT
    allowNull: no
  tags:
    type: oTypes.INTEGER
    allowNull: no
  createdAt:
    type: oTypes.DATE
    allowNull: no
    defaultValue: oTypes.NOW
  updatedAt:
    type: oTypes.DATE
    allowNull: yes
    defaultValue: null
