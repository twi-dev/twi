'use strict'

module.exports = (oTypes) ->
  userId:
    type: oTypes.UUID
    defaultValue: oTypes.UUIDV1
    primaryKey: yes
    allowNull: no
    field: 'user_id'
  contactsId:
    type: oTypes.UUID
    unique: yes
    allowNull: no
    field: 'contacts_id'
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
  firstname:
    type: oTypes.STRING 36
    allowNull: yes
  lastname:
    type: oTypes.STRING 40
    allowNull: yes
  gender:
    type: oTypes.INTEGER 1
    allowNull: yes
    defaultValue: null
  about:
    type: oTypes.TEXT
    allowNull: yes
  registeredAt:
    type: oTypes.DATE
    allowNull: no
    defaultValue: oTypes.NOW
    field: 'registered_at'
  lastVisit:
    type: oTypes.DATE
    allowNull: yes
    field: 'last_visit'
  role:
    type: oTypes.INTEGER 1
    allowNull: no
    defaultValue: 0 # User by default
  status:
    type: oTypes.INTEGER 1
    allowNull: no
    defaultValue: 0 # Inactive by default
