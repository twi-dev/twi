"use strict"

module.exports = ({UUID, UUIDV1, STRING, TEXT, INTEGER, DATE, NOW}) ->
  userId:
    type: UUID
    defaultValue: UUIDV1
    primaryKey: yes
    allowNull: no
    field: "user_id"
  login:
    type: STRING 32
    unique: yes
    allowNull: no
  password:
    type: STRING
    allowNull: no
  email:
    type: STRING
    unique: yes
    allowNull: no
  firstname:
    type: STRING 36
    allowNull: yes
  lastname:
    type: STRING 40
    allowNull: yes
  gender:
    type: INTEGER 1
    allowNull: yes
    defaultValue: null
  about:
    type: TEXT
    allowNull: yes
  registeredAt:
    type: DATE
    allowNull: no
    defaultValue: NOW
    field: "registered_at"
  lastVisit:
    type: DATE
    allowNull: yes
    field: "last_visit"
  role:
    type: INTEGER 1
    allowNull: no
    defaultValue: 0 # User by default
  status:
    type: INTEGER 1
    allowNull: no
    defaultValue: 0 # Inactive by default
