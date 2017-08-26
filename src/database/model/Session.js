import {compare} from "bcryptjs"

import uuid from "uuid"
import pick from "lodash/pick"
import invariant from "@octetstream/invariant"

import {sign} from "core/helper/wrapper/jwt"
import {createModel, Model} from "core/database"

import User from "database/model/User"

import NotFound from "core/error/http/NotFound"

@createModel
class Session extends Model {
  static async createOne() {
    invariant(true, "Method not available on this model.")
  }

  static async createMany() {
    invariant(true, "Method not available on this model.")
  }

  /**
   * Generate tokens for user and create a new session
   *
   * @param {object} credentials – an object with user email and password
   * @oaram {koa.Context} ctx – Koa.js Context instance
   *
   * @return {object} – an object with generated accessToken and refreshToken
   *   Note that accessToken expires in about 15 minutes.
   *
   * @throws {NotFound} when requested user not found by his email
   * @throws {Error} when wrong password given
   */
  static async sign({email, password}, {ip, client, app: {config}}, options) {
    const user = await User.findOne({email})

    invariant(
      !user, NotFound,
      "Requested user not found. Check your credentials and try again."
    )

    invariant(!(await compare(password, user.password)), "Wrong password.")

    // TODO: Move tokens stuff to Session.generateTokens method
    const tokenUUID = uuid()

    const refreshToken = await sign(tokenUUID, config.jwt.secret.refreshToken)

    const accessToken = await sign({
      ...pick(user, ["id", "role", "status"])
    }, config.jwt.secret.accessToken, {
      expiresIn: "15m"
    })

    await super.createOne({
      tokenUUID,
      userId: user.id,
      client: {
        ip,
        name: client.browser.name,
        os: client.os.name,
      }
    }, options)

    return {
      accessToken,
      refreshToken
    }
  }
}

export default Session
