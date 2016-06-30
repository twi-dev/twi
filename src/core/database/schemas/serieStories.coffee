'use strict'

module.exports = (types) ->
  id:
    type: types.UUID
    defaultValue: types.UUIDV1
    primaryKey: yes
    allowNull: no
  serieId:
    type: types.UUID
    allowNull: no
    field: 'serie_id'
  storyId:
    type: types.UUID
    allowNull: no
    field: 'story_id'
  number:
    type: types.INTEGER
    allowNull: yes
    defaultValue: null
