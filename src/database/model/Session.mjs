import {compare} from "bcryptjs"

import ms from "ms"
import uuid from "uuid"
import pick from "lodash/pick"
import invariant from "@octetstream/invariant"

import config from "core/config"
import {sign, verify} from "core/helper/wrapper/jwt"
import {createModel, Model} from "core/database"

import User from "database/model/User"

import Forbidden from "core/error/http/Forbidden"
import NotFound from "core/error/http/NotFound"

const {jwt} = config

@createModel
class Session extends Model {
  static get defaultType() {
    return "Bearer"
  }

  static async createOne() {
    invariant(true, "Method not available on this model.")
  }

  static async createMany() {
    invariant(true, "Method not available on this model.")
  }

  /**
   * Generate an access token and refreshToken
   *
   * @param {object} payload - payload for an accessToken
   * @param {object} config – JWT configuration
   * @param {boolean} noRefreshToken – generate only accessToken
   *
   * @return {object}
   *
   * @private
   */
  static async __generateTokens(payload, noRefreshToken = false) {
    const expiresIn = jwt.expiresIn || "15m"

    const type = Session.defaultType

    const accessToken = {
      type,
      expires: new Date(Date.now() + ms(expiresIn)),
      payload: await sign(payload, jwt.secret.accessToken, {
        expiresIn
      })
    }

    let refreshToken = {}
    if (noRefreshToken === false) {
      const tokenUUID = uuid()

      refreshToken = {
        type,
        tokenUUID,
        payload: await sign(tokenUUID, jwt.secret.refreshToken)
      }
    }

    return {
      accessToken,
      refreshToken
    }
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
  static async sign({args, ctx, options}) {
    const {password} = args.user
    const {client, ip} = ctx

    const login = new RegExp(`^${args.user.login}$`, "i")

    const user = await User.findOne({login})

    invariant(
      !user, NotFound,
      "Requested user not found. Check your credentials and try again."
    )

    invariant(!(await compare(password, user.password)), "Wrong password.")

    const tokens = await this.__generateTokens(
      pick(user, ["id", "role", "status"])
    )

    await super.createOne({
      tokenUUID: tokens.refreshToken.tokenUUID,
      userId: user.id,
      client: {
        ip,
        name: client.browser.name,
        os: client.os.name,
      }
    }, options)

    return tokens
  }

  /**
   * Refresh user access token
   *
   * @param {string} refreshToken
   *
   * @return {object} – an access roken with expires date
   */
  static async refresh(refreshToken) {
    const session = await this.findOneCurrent(refreshToken, {
      toJS: false
    })

    invariant(!session, Forbidden, "You have no access for this operation.")

    const user = await User.findOneById(session.userId)

    // FIXME: Should I remove the session if user not exists? Hm...
    invariant(!user, NotFound, "Can't find user for this session.")

    const tokens = await this.__generateTokens(
      pick(user, ["id", "role", "status"]), true
    )

    session.dates.lastLogin = new Date()

    await session.save()

    return tokens.accessToken
  }

  /**
   * Revoke all user session except the current
   *
   * @param {string}
   */
  static async revoke(refreshToken) {
    const currentSession = await this.findOneCurrent(refreshToken)

    const sessions = await this.find({
      userId: currentSession.userId,
      $not: {
        tokenUUID: currentSession.tokenUUID
      }
    })

    const removed = await Promise.all(sessions.map(sess => sess.remove()))

    return removed.map(({id}) => id)
  }

  static async findOneCurrent(refreshToken, options = {}) {
    const tokenUUID = await verify(refreshToken, jwt.secret.refreshToken)

    return this.findOne({tokenUUID}, options)
  }
}

export default Session
