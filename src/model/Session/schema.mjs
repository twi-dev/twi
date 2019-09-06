import {DataTypes as t} from "sequelize"

const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false
  },
  hash: {
    type: t.CHAR(128),
    unique: true,
    allowNull: false,
    comment: "SHA512 hash used as session's fingerprint"
  },
  clientBrowserName: {
    type: t.STRING,
    allowNull: false
  },
  clientBrowserVersion: {
    type: t.STRING,
    allowNull: false
  },
  clientOsName: {
    type: t.STRING,
    allowNull: false
  },
  clientOsVersion: {
    type: t.STRING,
    allowNull: false
  },
  clientIp: {
    type: t.STRING,
    allowNull: false
  }
}

export default schema
