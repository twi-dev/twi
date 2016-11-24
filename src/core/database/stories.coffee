"use strict"

module.exports = (types) ->
  storyId:
    type: types.UUID
    defaultValue: types.UUIDV1
    primaryKey: yes
    allowNull: no
    field: "story_id"
  userId:
    type: types.UUID
    allowNull: no
    field: "user_id"
  title:
    type: types.TEXT
    allowNull: no
  slug:
    type: types.TEXT # Slug format <story_name>.<timestamp>
    allowNull: no
  isItTranslation:
    type: types.BOOLEAN
    allowNull: no
    defaultValue: no
    field: "is_it_translation"
  wasProofreadByBeta:
    type: types.BOOLEAN # This story was proofread by beta?
    defaultValue: no
    allowNull: no
    field: "was_proofread_by_beta"
  description:
    type: types.TEXT
    allowNull: no
  cover:
    type: types.STRING
    allowNull: yes
  rating:
    type: types.INTEGER
    allowNull: no
    defaultValue: 0
