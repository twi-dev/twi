module.exports = (types) ->
  id:
    type: types.UUID
    primaryKey: yes
    defaultValue: types.UUIDV1
    allowNull: no
  storyId:
    type: types.UUID
    unique: yes
    field: 'story_id'
  markId:
    type: types.UUID
    unique: yes
    field: 'mark_id'
