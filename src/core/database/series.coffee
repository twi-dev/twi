"use strict"

module.exports = ({UUID, UUIDV1, TEXT, INTEGER}) ->
  serieId:
    type: UUID
    defaultValue: UUIDV1
    primaryKey: yes
    notNull: yes
    field: "serie_id"
  ownerId:
    type: UUID
    allowNull: no
    field: "owner_id"
  title:
    type: TEXT
    allowNull: no
  description:
    type: TEXT
    allowNull: no
  # Based on ratings of all stories in serie
  # Formula: <sum of all stories in serie> / <total stories in serie>
  rating:
    type: INTEGER
    defaultValue: 0
    allowNull: no
