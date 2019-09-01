import {DataTypes as t} from "sequelize"

const {values} = Object

const schema = Collaborator => ({
  role: {
    type: t.ENUM(values(Collaborator.roles)),
    default: Collaborator.roles.write,
    allowNull: false
  }
})

export default schema()
