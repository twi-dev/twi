import freeze from "js-flock/deepFreeze"

import readOnly from "core/helper/decorator/readOnly"

import {createModel, Model} from "core/db"

import schema from "./schema"

@createModel(schema)
class Collaborator extends Model {
  @readOnly static roles = freeze({
    writer: 0,
    editor: 1,
    translator: 2,
    painter: 3
  })

  static async create(collaborator, options = {}) {
    collaborator.role = Collaborator.roles[collaborator.role]

    return super.create(collaborator, options)
  }

  async updateRole(role, options) {
    await this.update({$set: {role: Collaborator.roles[role]}}, options)

    return Collaborator.findbyId(this.id)
  }

  /**
   * Get collaborator role name
   *
   * @private
   */
  get roleName() {
    return this._findKey(Collaborator.roles, this.role).toUpperCase()
  }

  async toJS(options) {
    const collaborator = await super.toJS(options)

    collaborator.role = this.roleName

    return collaborator
  }
}

export default Collaborator
