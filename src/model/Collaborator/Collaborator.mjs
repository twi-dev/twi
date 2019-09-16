import {Model} from "sequelize"

import freeze from "js-flock/deepFreeze"

import createModel from "core/db/createModel"
import readOnly from "core/helper/decorator/readOnly"

import schema from "./schema"

@createModel(schema)
class Collaborator extends Model {
  @readOnly static roles = freeze({
    translate: "translate",
    write: "write",
    beta: "beta",
    art: "art"
  })
}

export default Collaborator
