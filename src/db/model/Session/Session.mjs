import {createHash} from "crypto"

import invariant from "@octetstream/invariant"

// import {verify} from "core/helper/wrapper/jwt"
import {createModel, Model} from "core/db"

import schema from "./schema"

import {signAccessToken, signRefreshToken} from "./signToken"

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

  /**
   * Refresh user access token
   *
   * @param {string} refreshToken
   *
   * @return {object} – an access roken with expires date
   */
  // static async refresh(token) {}

  /**
   * Revoke all user session except the current
   *
   * @param {string}
   */
  // static async revoke(params) {
  //   const currentSession = await this.findOneCurrent(params)
  //   const sessions = await this.find({
  //     userId: currentSession.userId,
  //     $not: {
  //       tokenUUID: currentSession.tokenUUID
  //     }
  //   })
  //   const removed = await Promise.all(sessions.map(sess => sess.remove()))
  //   return removed.map(({id}) => id)
  // }
}

export default Session
