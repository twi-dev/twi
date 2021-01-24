const {DataTypes: t} = require("sequelize")

const roles = require("../../server/model/User/roles.json")
const statuses = require("../../server/model/User/statuses.json")

const {values} = Object

const tableName = "users"
const avatarFkName = "users_avatar_fk"

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
        avatar_id: {
          type: t.INTEGER.UNSIGNED,
          allowNull: true,
          defaultValue: null
        },
        email: {
          type: t.STRING,
          allowNull: false,
          unique: true
        },
        login: {
          type: t.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: t.STRING,
          allowNull: false
        },
        status: {
          type: t.ENUM(values(statuses)),
          defaultValue: statuses.inactive,
          allowNull: false
        },
        role: {
          type: t.ENUM(values(roles)),
          defaultValue: roles.user,
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
      }
    )

    await q.addConstraint(
      tableName,

      {
        transaction,
        name: avatarFkName,
        type: "foreign key",
        fields: ["avatar_id"],
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
    await q.removeConstraint(tableName, avatarFkName, {transaction})

    await q.dropTable(tableName, {transaction})
  })
}
