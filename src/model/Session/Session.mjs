import {createHash} from "crypto"

import {Model, Op as op} from "sequelize"

import pick from "lodash/pick"

import {verify} from "core/helper/wrapper/jwt"

import Unauthorized from "core/error/http/Unauthorized"
import createModel from "core/db/createModel"
import config from "core/base/config"

import schema from "./schema"

import {signAccessToken, signRefreshToken} from "./util/signToken"

const {jwt} = config

const serializeUser = user => pick(user, ["id", "role", "status"])
const serializeClient = ({ip, os, browser}) => ({
  clientIp: ip,
  clientOsName: os.name,
  clientOsVersion: os.version,
  clientBrowserName: browser.name,
  clientBrowserVersion: browser.version
})

@createModel(schema)
class Session extends Model {
  static async sign({user, client}) {
    client = serializeClient(client)
    user = serializeUser(user)

    const payload = JSON.stringify({...user, client, now: Date.now()})
    const hash = createHash("sha512").update(payload).digest("hex")

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(user), signRefreshToken({hash})
    ])

    return super.create({...client, hash, userId: user.id})
      .then(() => ({accessToken, refreshToken}))
  }

  static async findByToken(token, options) {
    const {hash} = await verify(token, jwt.refreshToken.secret)

    const session = await this.findOne({...options, where: {hash}})

    if (!session) {
      throw new Unauthorized("Can't find a session for given token.")
    }

    return session
  }

  static async revokeAllButCurrent({token, userId}, options) {
    const {hash} = await verify(token, jwt.refreshToken.secret)

    return this.destroy({where: {userId, [op.ne]: {hash}}}, options)
      .then(() => true)
  }

  async refresh({user, client}, options) {
    client = serializeClient(client)
    user = serializeUser(user)

    const payload = JSON.stringify({
      ...user, id: this.userId, client, now: Date.now()
    })

    const hash = createHash("sha512").update(payload).digest("hex")

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken({...user, id: this.userId}), signRefreshToken({hash})
    ])

    return this.update({
      ...client, hash, updatedAt: accessToken.signed
    }, options).then(() => ({accessToken, refreshToken}))
  }
}

export default Session
