module.exports = ({UUID, UUIDV1}) ->
  id:
    type: UUID
    primaryKey: yes
    defaultValue: UUIDV1
    allowNull: no
  storyId:
    type: UUID
    unique: yes
    field: "story_id"
  markId:
    type: UUID
    unique: yes
    field: "mark_id"
