'use strict'

module.exports = (types) ->
  id:
    type: types.UUID
    defaultValue: types.UUIDV1
    primaryKey: yes
    allowNull: no
  storyId:
    type: types.UUID
    allowNull: no
    field: 'story_id'
  characterId:
    type: types.UUID
    allowNull: no
    field: 'character_id'
