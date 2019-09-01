import {Model, DataTypes as t} from "sequelize"

class Contacts extends Model {}

Contacts.init({
  id: {
    type: t.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
})

export default Contacts
