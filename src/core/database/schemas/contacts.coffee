'use strict'

module.exports = (oTypes) ->
  contactsId:
    type: oTypes.INTEGER
    primaryKey: yes
    autoIncrement: on
  email:
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
