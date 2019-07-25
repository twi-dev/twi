import {createHash} from "crypto"

import pick from "lodash/pick"

import {createModel, Model} from "core/db"
import {verify} from "core/helper/wrapper/jwt"

import BadRequest from "core/error/http/BadRequest"
import config from "core/base/config"

import schema from "./schema"

import {signAccessToken, signRefreshToken} from "./signToken"

const {jwt} = config

const serializeUser = user => pick(user, [
  "id", "role", "status", "roleName", "statusName"
])

@createModel(schema)
class Session extends Model {
  static create() {
    return Promise.reject(Error("Method is not available on this model."))
  }

  static createMany() {
    return Promise.reject(Error("Method is not available on this model."))
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
  static async sign({user, client}, options) {
    user = serializeUser(user)

    const payload = JSON.stringify({...user, client, now: Date.now()})
    const hash = createHash("sha512").update(payload).digest("hex")

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(user), signRefreshToken({hash})
    ])

    return super.create({userId: user.id, client, hash}, options)
      .then(() => ({accessToken, refreshToken}))
  }

  static async findByToken(token, options) {
    const payload = await verify(token, jwt.refreshToken.secret)
    const session = await this.findOne({hash: payload.hash}, options)

    if (!session) {
      throw new BadRequest("Can't find a session for given token.")
    }

    return session
  }

  static async revokeAllButCurrent({token, userId}, options) {
    const payload = await verify(token, jwt.refreshToken.secret)

    return this.find({userId, hash: {$not: payload.hash}}).remove(options)
      .then(({ok}) => ok === 1)
  }

  /**
   * Refresh user's access token
   *
   * @param {string} refreshToken
   *
   * @return {object} – an access roken with expires date
   */
  async refresh({user, client}, options) {
    user = serializeUser(user)

    const payload = JSON.stringify({
      ...user, id: this.userId, client, now: Date.now()
    })

    const hash = createHash("sha512").update(payload).digest("hex")

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken({...user, id: this.userId}), signRefreshToken({hash})
    ])

    const params = {$set: {"dates.updatedAt": accessToken.signed, client, hash}}

    return this.update(params, options)
      .then(() => ({accessToken, refreshToken}))
  }
}

export default Session
