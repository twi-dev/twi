'use strict'

module.exports = (oTypes) ->
  contactsId:
    type: oTypes.INTEGER
    primaryKey: yes
    allowNull: no
    autoIncrement: on
  userId:
    type: oTypes.INTEGER
    allowNull: no
  contactEmail:
    type: oTypes.STRING
    allowNull: yes
    unique: yes
  vk:
    type: oTypes.STRING
    allowNull: yes
  twitter:
    type: oTypes.STRING
    allowNull: yes
  facebook:
    type: oTypes.STRING
    allowNull: yes
  fimfiction:
    type: oTypes.STRING
    allowNull: yes
  ficbook:
    type: oTypes.STRING
    allowNull: yes
