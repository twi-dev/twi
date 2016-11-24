"use strict"

module.exports = ({UUID, UUIDV1, STRING}) ->
  contactsId:
    type: UUID
    primaryKey: yes
    defaultValue: UUIDV1
    allowNull: no
    field: "contacts_id"
  userId:
    type: UUID
    unique: yes
    allowNull: no
    field: "user_id"
  email:
    type: STRING
    allowNull: yes
    unique: yes
  vk:
    type: STRING
    allowNull: yes
  twitter:
    type: STRING
    allowNull: yes
  facebook:
    type: STRING
    allowNull: yes
  fimfiction:
    type: STRING
    allowNull: yes
  ficbook:
    type: STRING
    allowNull: yes
