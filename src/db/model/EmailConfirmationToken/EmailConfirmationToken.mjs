import {createHash} from "crypto"

import {createModel, Model} from "core/db"

import schema from "./schema"

@createModel(schema)
class EmailConfirmationToken extends Model {
  static findByHash(hash) {
    return this.findOne({hash})
  }

  static async createOne({email, id}) {
    const payload = `${email}::${Date.now()}`
    const hash = createHash("sha256").update(payload).digest("hex")

    return super.createOne({userId: id, email, hash})
  }
}

export default EmailConfirmationToken
