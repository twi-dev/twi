import {compare} from "bcryptjs"

import ms from "ms"
import uuid from "uuid"
import pick from "lodash/pick"
import invariant from "@octetstream/invariant"
import time from "date-fns/add_milliseconds"

import config from "core/config"
import {sign, verify} from "core/helper/wrapper/jwt"
import {createModel, Model} from "core/database"

import User from "database/model/User"

import Forbidden from "core/error/http/Forbidden"
import NotFound from "core/error/http/NotFound"

const {jwt} = config

async function generateToken(payload, options = {}) {
  let {expires} = options

  expires = expires ? time(Date.now(), ms(expires)) : null

  payload = await sign(payload, options.secret, {expiresIn: options.expires})

  return {payload, expires}
}

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

    const accessToken = await generateToken(
      pick(user, ["id", "role", "status"]), jwt.accessToken
    )

    const refreshToken = await generateToken({
      uuid: uuid()
    }, jwt.refreshToken)

    const tokens = {accessToken, refreshToken}

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
  static async refresh(params) {
    const session = await this.findOneCurrent({
      ...params,
      options: {
        ...params.options, toJS: false
      }
    })

    invariant(!session, Forbidden, "You have no access for this operation.")

    const user = await User.findOneById(session.userId)

    // FIXME: Should I remove the session if user not exists? Hm...
    invariant(!user, NotFound, "Can't find user for this session.")

    const accessToken = await generateToken(
      pick(user, ["id", "role", "status"]), jwt.accessToken
    )

    session.dates.lastLogin = new Date()

    await session.save()

    const type = Session.defaultType

    return {
      ...accessToken, type
    }
  }

  /**
   * Revoke all user session except the current
   *
   * @param {string}
   */
  static async revoke(params) {
    const currentSession = await this.findOneCurrent(params)

    const sessions = await this.find({
      userId: currentSession.userId,
      $not: {
        tokenUUID: currentSession.tokenUUID
      }
    })

    const removed = await Promise.all(sessions.map(sess => sess.remove()))

    return removed.map(({id}) => id)
  }

  static async findOneCurrent({args, options}) {
    const {refreshToken} = args

    const payload = await verify(refreshToken, jwt.refreshToken.secret)

    return this.findOne({tokenUUID: payload.uuid || payload}, options)
  }
}

export default Session
