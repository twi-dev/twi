const {DataTypes: t} = require("sequelize")

const tableName = "files"

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
          autoIncrement: true,
          primaryKey: true
        },
        path: {
          type: t.TEXT,
          allowNull: false
        },
        hash: {
          type: t.CHAR(128),
          allowNull: false,
          comment: "SHA512 hash"
        },
        mime: {
          type: t.STRING,
          allowNull: false
        },
        size: {
          type: t.INTEGER.UNSIGNED,
          allowNull: false,
          comment: "File size in bytes"
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
