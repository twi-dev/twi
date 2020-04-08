import {DataTypes as t} from "sequelize"

const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  hash: {
    type: t.CHAR(128),
    allowNull: false,
    unique: true,
    comment: "SHA512 session fingerprint"
  },
  userId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false
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
