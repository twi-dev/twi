import {DataTypes as t} from "sequelize"

const schema = {
  userId: {
    type: t.INTEGER,
    allowNull: false,
    field: "user_id"
  },
  hash: {
    type: t.STRING(128),
    unique: true,
    allowNull: false,
    comment: "A SHA512 has used as session's fingerprint"
  },
  clientBrowserName: {
    type: t.STRING,
    allowNull: false,
    field: "client_browser_name"
  },
  clientBrowserVersion: {
    type: t.STRING,
    allowNull: false,
    field: "client_browser_version"
  },
  clientOsName: {
    type: t.STRING,
    allowNull: false,
    field: "client_os_name"
  },
  clientOsVersion: {
    type: t.STRING,
    allowNull: false,
    field: "client_os_version"
  },
  clientIp: {
    type: t.STRING,
    allowNull: false,
    field: "client_ip"
  }
}

export default schema
