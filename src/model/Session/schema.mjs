import {DataTypes as t} from "sequelize"

const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: t.INTEGER,
    allowNull: false,
    field: "user_id"
  },
  hash: {
    type: t.CHAR(128),
    unique: true,
    allowNull: false,
    comment: "SHA512 hash used as session's fingerprint"
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
