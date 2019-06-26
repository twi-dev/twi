import {createHash} from "crypto"

import {createModel, Model} from "core/db"

import schema from "./schema"

@createModel(schema)
class EmailConfirmationToken extends Model {
  static findByHash(hash, options) {
    return this.findOne({hash}, options)
  }

  static async create({email, userId}, options) {
    const payload = JSON.stringify({userId, email, now: Date.now()})
    const hash = createHash("sha512").update(payload).digest("hex")

    return super.create({userId, email, hash}, options)
  }
}

export default EmailConfirmationToken
