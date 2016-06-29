'use strict'

module.exports = (types) ->
  contactsId:
    type: types.UUID
    primaryKey: yes
    defaultValue: types.UUIDV1
    allowNull: no
    field: 'contacts_id'
  email:
    type: types.STRING
    allowNull: yes
    unique: yes
  vk:
    type: types.STRING
    allowNull: yes
  twitter:
    type: types.STRING
    allowNull: yes
  facebook:
    type: types.STRING
    allowNull: yes
  fimfiction:
    type: types.STRING
    allowNull: yes
  ficbook:
    type: types.STRING
    allowNull: yes
