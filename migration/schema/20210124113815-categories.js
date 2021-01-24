const {DataTypes: t} = require("sequelize")

const tableName = "categories"

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
        name: {
          type: t.STRING,
          allowNull: false
        },
        prefix: {
          type: t.STRING,
          allowNull: false,
          unique: true
        },
        order: {
          type: t.INTEGER.UNSIGNED,
          allowNull: false
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
