import freeze from "js-flock/deepFreeze"

import readOnly from "core/helper/decorator/readOnly"

import {createModel, Model} from "core/db"

import schema from "./schema"

@createModel(schema)
class Collaborator extends Model {
  @readOnly static roles = freeze({
    write: 0,
    edit: 1,
    translate: 2,
    art: 3
  })

  static async create(collaborator, options = {}) {
    collaborator.role = Collaborator.roles[collaborator.role]

    return super.create(collaborator, options)
  }

  async updateRole(role, options) {
    return this.update({$set: {role: Collaborator.roles[role]}}, options)
  }
}

export default Collaborator
