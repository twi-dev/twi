'use strict'

module.exports = (oTypes) ->
  id:
    type: oTypes.INTEGER
    primaryKey: yes
    autoIncrement: on
    allowNull: no
  postId:
    type: oTypes.INTEGER
    allowNull: no
  tagId:
    type: oTypes.INTEGER
    allowNull: no
