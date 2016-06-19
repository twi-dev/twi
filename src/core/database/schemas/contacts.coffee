'use strict'

module.exports = (oTypes) ->
  contactsId:
    type: oTypes.UUID
    primaryKey: yes
    defaultValue: oTypes.UUIDV1
    allowNull: no
    field: 'contacts_id'
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
