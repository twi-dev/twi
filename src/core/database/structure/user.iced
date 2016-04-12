'use strict'

module.exports = (oTypes) ->
  userId:
    type: oTypes.INTEGER
    primaryKey: yes
    allowNull: no
    autoIncrement: on
  login:
    type: oTypes.STRING 32
    unique: yes
    allowNull: no
  password:
    type: oTypes.STRING
    allowNull: no
  email:
    type: oTypes.STRING
    unique: yes
    allowNull: no
  about:
    type: oTypes.TEXT
    allowNull: yes
  registeredAt:
    type: oTypes.DATE
    allowNull: no
    defaultValue: oTypes.NOW
  lastVisit:
    type: oTypes.DATE
    allowNull: yes
  role:
    type: oTypes.INTEGER 1
    allowNull: no
    defaultValue: 0 # User by default
  status:
    type: oTypes.INTEGER 1
    allowNull: no
    defaultValue: 0 # Inactive by default
