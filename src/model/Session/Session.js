import {createHash} from "crypto"

import {Model, Op as op} from "sequelize"

import pick from "lodash/pick"

import {verify} from "lib/helper/wrapper/jwt"

import Unauthorized from "lib/error/http/Unauthorized"
import objectFlat from "lib/helper/object/flat"
import createModel from "lib/db/createModel"
import config from "lib/base/config"

import schema from "./schema"

import {signAccessToken, signRefreshToken} from "./util/signToken"

const {jwt} = config

const serializeUser = user => pick(user, ["id", "role", "status"])

/**
 * @typedef {import("model/Session/util/signToken").AuthToken} AuthToken
 */

/**
 * @typedef {import("model/User").default} User
 */

@createModel(schema)
class Session extends Model {
  /**
   * @public
   * @static
   * @method
   *
   * @param {Object} params
   * @param {User} params.user
   * @param {Object<string, any>} params.client
   * @param {Object<string, any>} [options = {}]
   *
   * @return {AuthToken}
   */
  static async sign({user, client}, options) {
    client = objectFlat({client})
    user = serializeUser(user)

    const payload = JSON.stringify({...client, ...user, now: Date.now()})
    const hash = createHash("sha512").update(payload).digest("hex")

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(user), signRefreshToken({hash})
    ])

    return super.create({...client, hash, userId: user.id}, options)
      .then(() => ({accessToken, refreshToken}))
  }

  /**
   * @public
   * @static
   * @method
   *
   * @param {string} token
   * @param {Object<string, any>} [options = {}]
   *
   * @return {Session}
   */
  static async findByToken(token, options) {
    const {hash} = await verify(token, jwt.refreshToken.secret)

    const session = await this.findOne({...options, where: {hash}})

    if (!session) {
      throw new Unauthorized("Can't find a session for given token.")
    }

    return session
  }

  /**
   * Removes all sessions associated with given userId, except the current
   *
   * @public
   * @static
   * @method
   *
   * @param {Object} params
   * @param {string} params.token
   * @param {number} params.userId
   * @param {Object<string, any>} [options = {}]
   *
   * @param {Promise<number>}
   */
  static async revokeAllButCurrent({token, userId}, options) {
    const {hash} = await verify(token, jwt.refreshToken.secret)

    return this.destroy({where: {userId, [op.ne]: {hash}}}, options)
  }

  /**
   * @public
   * @static
   * @method
   *
   * @param {Object} params
   * @param {User} params.user
   * @param {Object<string, any>} params.client
   * @param {Object<string, any>} options
   *
   * @return {AuthToken}
   */
  async refresh({user, client}, options) {
    client = objectFlat({client})
    user = serializeUser(user)

    const payload = JSON.stringify({
      ...client, ...user, id: this.userId, now: Date.now()
    })

    const hash = createHash("sha512").update(payload).digest("hex")

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken({...user, id: this.userId}), signRefreshToken({hash})
    ])

    const fields = {...client, hash, updatedAt: accessToken.signed}

    return this.update(fields, options)
      .then(() => ({accessToken, refreshToken}))
  }
}

export default Session
