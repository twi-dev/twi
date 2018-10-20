import {compare} from "bcryptjs"

import ms from "ms"
import uuid from "uuid"
import pick from "lodash/pick"
import omit from "lodash/omit"
import invariant from "@octetstream/invariant"
import addMilliseconds from "date-fns/addMilliseconds"

import {sign, verify} from "core/helper/wrapper/jwt"
import {createModel, Model} from "core/database"

import config from "core/config"
import User from "database/model/User"
import NotFound from "core/error/http/NotFound"
import Forbidden from "core/error/http/Forbidden"
import parallel from "core/helper/array/runParallel"
import map from "core/helper/iterator/sync/mapObject"

const {jwt} = config

async function generateToken(payload, options = {}) {
  let {expires} = options

  expires = expires ? addMilliseconds(Date.now(), ms(expires)) : null

  const opts = {}

  if (expires) {
    opts.expiresIn = Number(expires)
  }

  payload = await sign(payload, options.secret, opts)

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
  static async sign({args, ctx, options, ...params}) {
    const {password, ...credentials} = args.credentials
    const {client, ip} = ctx

    const login = new RegExp(`^${credentials.login}$`, "i")

    const user = await User.findByLogin({
      ...omit(params, "node"),

      ctx,
      options: {...options, toJS: false},
      args: {login}
    })

    invariant(
      !user, NotFound,

      "Requested user not found. Check your credentials and try again."
    )

    invariant(!(await compare(password, user.password)), "Wrong password.")

    const accessToken = await generateToken(
      pick(user, ["id", "role", "status"]), jwt.accessToken
    )

    const tokenUUID = uuid()

    const refreshToken = await generateToken({tokenUUID}, jwt.refreshToken)

    const tokens = map({accessToken, refreshToken}, obj => ({
      ...obj, type: Session.defaultType
    }))

    await super.createOne({
      tokenUUID,
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
    const session = await this.findOneCurrent(params)

    invariant(!session, Forbidden, "You have no access for this operation.")

    const user = await User.findById({
      ...omit(params, "node"), args: {id: session.userId}
    })

    const accessToken = await generateToken(
      pick(user, ["id", "role", "status"]), jwt.accessToken
    )

    await parallel([user.updateLastVisit, session.updateLastLogin])

    const type = Session.defaultType

    return {...accessToken, type}
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

    const {tokenUUID} = await verify(refreshToken, jwt.refreshToken.secret)

    return this.findOne({tokenUUID}, options)
  }

  updateLastLogin = () => this.update({"dates.lastLogin": new Date()}).exec()
}

export default Session
