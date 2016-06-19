module.exports = (oTypes) ->
  id:
    type: oTypes.UUID
    primaryKey: yes
    defaultValue: oTypes.UUIDV1
    allowNull: no
  storyId:
    type: oTypes.UUID
    unique: yes
    field: 'story_id'
  markId:
    type: oTypes.UUID
    unique: yes
    field: 'mark_id'
