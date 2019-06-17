import {createHash} from "crypto"

import invariant from "@octetstream/invariant"

import {verify} from "core/helper/wrapper/jwt"
import {createModel, Model} from "core/db"

import config from "core/base/config"
import BadRequest from "core/error/http/BadRequest"

import schema from "./schema"

import {signAccessToken, signRefreshToken} from "./signToken"

const {jwt} = config

@createModel(schema)
class Session extends Model {
  static get defaultType() {
    return "Bearer"
  }

  static async createOne() {
    invariant(true, "Method is not available on this model.")
  }

  static async createMany() {
    invariant(true, "Method is not available on this model.")
  }

  /**
   * Generate tokens for user and create a new session
   *
   * @param {object} credentials – an object with user login and password
   * @oaram {koa.Context} ctx – Koa.js Context instance
   *
   * @return {object} – an object with generated accessToken and refreshToken
   *   Note that accessToken expires in about 15 minutes.
   *
   * @throws {NotFound} when requested user not found by his login
   * @throws {Error} when wrong password given
   */
  static async sign({userId, client}, options) {
    const hash = createHash("sha512")
      .update(JSON.stringify({userId, client, now: Date.now()}))
      .digest("hex")

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken({userId}), signRefreshToken({hash})
    ])

    await super.createOne({userId, client, hash}, options)

    return {accessToken, refreshToken}
  }

  static async findByToken(token) {
    const payload = await verify(token, jwt.refreshToken.secret)
    const session = await this.findOne({hash: payload.hash})

    if (!session) {
      throw new BadRequest("Can't find a session for given token.")
    }

    return session
  }

  static async revokeAllButCurrent({token, userId}) {
    const payload = await verify(token, jwt.refreshToken.secret)

    return this.find({userId, hash: {$not: payload.hash}}).remove()
      .then(({ok}) => ok === 1)
  }

  /**
   * Refresh user's access token
   *
   * @param {string} refreshToken
   *
   * @return {object} – an access roken with expires date
   */
  async refresh() {
    const accessToken = await signAccessToken({userId: this.userId})

    return this.update({$set: {"dates.updatedAt": accessToken.signed}})
      .then(() => accessToken)
  }
}

export default Session
