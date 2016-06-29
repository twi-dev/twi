'use strict'

module.exports = (types) ->
  serieId:
    type: types.UUID
    defaultValue: UUIDV1
    primaryKey: yes
    notNull: yes
    field: 'serie_id'
  ownerId:
    type: types.UUID
    allowNull: no
    field: 'owner_id'
  title:
    type: types.TEXT
    allowNull: no
  description:
    type: types.TEXT
    allowNull: no
  # Based on ratings of all stories in serie
  # Formula: <sum of all stories in serie> / <total stories in serie>
  rating:
    type: types.INTEGER
    defaultValue: 0
    allowNull: no
