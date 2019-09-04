import {DataTypes as t} from "sequelize"

const schema = {
  id: {
    type: t.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  vk: t.STRING,
  fb: t.STRING,
  twitter: t.STRING,
  email: {
    type: t.STRING,
    validate: {
      isEmail: true
    }
  },
  website: {
    type: t.STRING,
    validate: {
      isUrl: true
    }
  }
}

export default schema
