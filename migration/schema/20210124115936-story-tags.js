const {DataTypes: t} = require("sequelize")

const tableName = "story_tags"
const storyTagUniqueName = "story_tags_unique"
const storyTagStoryFkName = "story_tag_story_fk"
const storyTagFkName = "story_tag_fk"

/**
 * @typedef {import("sequelize").QueryInterface} QueryInterface
 */

module.exports = {
  /**
   * @param {QueryInterface} q
   */
  up: async q => q.sequelize.transaction(async transaction => {
    await q.createTable(
      tableName,

      {
        story_id: {
          type: t.INTEGER.UNSIGNED,
          allowNull: false
        },
        tag_id: {
          type: t.INTEGER.UNSIGNED,
          allowNull: false
        }
      },

      {
        transaction
      }
    )

    await q.addConstraint(
      tableName,

      {
        transaction,
        name: storyTagUniqueName,
        type: "unique",
        fields: ["story_id", "tag_id"]
      }
    )

    await q.addConstraint(
      tableName,

      {
        transaction,
        name: storyTagStoryFkName,
        type: "foreign key",
        fields: ["story_id"],
        onDelete: "cascade",
        references: {
          table: "stories",
          field: "id"
        }
      }
    )

    await q.addConstraint(
      tableName,

      {
        transaction,
        name: storyTagFkName,
        type: "foreign key",
        fields: ["tag_id"],
        onDelete: "cascade",
        references: {
          table: "tags",
          field: "id"
        }
      }
    )
  }),

  /**
   * @param {QueryInterface} q
   */
  down: async q => q.sequelize.transaction(async transaction => {
    await q.removeConstraint(tableName, storyTagFkName, {transaction})

    await q.removeConstraint(tableName, storyTagStoryFkName, {transaction})

    await q.removeConstraint(tableName, storyTagUniqueName, {transaction})

    await q.dropTable(tableName, {transaction})
  })
}
