"use strict"

module.exports = (types) ->
  userId:
    type: types.UUID
    defaultValue: types.UUIDV1
    primaryKey: yes
    allowNull: no
    field: "user_id"
  login:
    type: types.STRING 32
    unique: yes
    allowNull: no
  password:
    type: types.STRING
    allowNull: no
  email:
    type: types.STRING
    unique: yes
    allowNull: no
  firstname:
    type: types.STRING 36
    allowNull: yes
  lastname:
    type: types.STRING 40
    allowNull: yes
  gender:
    type: types.INTEGER 1
    allowNull: yes
    defaultValue: null
  about:
    type: types.TEXT
    allowNull: yes
  registeredAt:
    type: types.DATE
    allowNull: no
    defaultValue: types.NOW
    field: "registered_at"
  lastVisit:
    type: types.DATE
    allowNull: yes
    field: "last_visit"
  role:
    type: types.INTEGER 1
    allowNull: no
    defaultValue: 0 # User by default
  status:
    type: types.INTEGER 1
    allowNull: no
    defaultValue: 0 # Inactive by default
