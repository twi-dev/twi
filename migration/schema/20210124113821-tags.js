const {DataTypes: t} = require("sequelize")

const tableName = "tags"

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
        category_id: {
          type: t.INTEGER.UNSIGNED,
          allowNull: false
        },
        name: {
          type: t.STRING,
          allowNull: false,
          unique: true
        },
        slug: {
          type: t.STRING,
          allowNull: false,
          unique: true
        },
        description: {
          type: t.STRING,
          allowNull: true,
          defaultValue: null
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
  }),

  /**
   * @param {QueryInterface} q
   */
  down: q => q.sequelize.transaction(async transaction => {
    await q.dropTable(tableName, {transaction})
  })
}
