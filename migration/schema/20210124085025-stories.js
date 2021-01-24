const {DataTypes: t} = require("sequelize")

const tableName = "stories"
const coverFkname = "stories_cover_fk"
const publisherFkName = "stories_publisher_fk"

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
        id: {
          type: t.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true
        },
        publisher_id: {
          type: t.INTEGER.UNSIGNED,
          allowNull: false
        },
        cover_id: {
          type: t.INTEGER.UNSIGNED,
          allowNull: false
        },
        title: {
          type: t.STRING,
          allowNull: false
        },
        description: {
          type: t.TEXT,
          allowNull: false
        },
        original_author_name: {
          type: t.STRING,
          allowNull: true,
          defaultValue: null
        },
        original_title: {
          type: t.STRING,
          allowNull: true,
          defaultValue: null
        },
        original_url: {
          type: t.STRING,
          allowNull: true,
          defaultValue: null
        },
        is_draft: {
          type: t.BOOLEAN,
          defaultValue: true,
        },
        is_finished: {
          type: t.BOOLEAN,
          defaultValue: false
        },
        chapters_count: {
          type: t.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0
        },
        created_at: {
          type: t.DATE,
          allowNull: false,
          defaultValue: t.NOW
        },
        updated_at: {
          type: t.DATE,
          allowNull: false,
          defaultValue: t.NOW
        },
        published_at: {
          type: t.DATE,
          allowNull: true,
          defaultValue: null
        },
        deleted_at: {
          type: t.DATE,
          allowNull: true,
          defaultValue: null
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
        name: publisherFkName,
        type: "foreign key",
        fields: ["publisher_id"],
        onDelete: "cascade",
        references: {
          table: "users",
          field: "id"
        }
      }
    )

    await q.addConstraint(
      tableName,

      {
        transaction,
        name: coverFkname,
        type: "foreign key",
        fields: ["cover_id"],
        onDelete: "cascade",
        references: {
          table: "files",
          field: "id"
        }
      }
    )
  }),

  /**
   * @param {QueryInterface} q
   */
  down: q => q.sequelize.transaction(async transaction => {
    await q.removeConstraint(tableName, coverFkname, {transaction})

    await q.removeConstraint(tableName, publisherFkName, {transaction})

    await q.dropTable(tableName, {transaction})
  })
}
