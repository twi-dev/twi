import {createHash} from "crypto"

import {Model, DataTypes as t, Op as op} from "sequelize"

import pick from "lodash/pick"

import {verify} from "core/helper/wrapper/jwt"

import Unauthorized from "core/error/http/Unauthorized"
import config from "core/base/config"

import User from "model/User"

import {signAccessToken, signRefreshToken} from "./util/signToken"

const {jwt} = config

const serializeUser = user => pick(user, ["id", "role", "status"])

class Session extends Model {
  static async sign({user, client}) {
    user = serializeUser(user)

    const payload = JSON.stringify({...user, client, now: Date.now()})
    const hash = createHash("sha512").update(payload).digest("hex")

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(user), signRefreshToken({hash})
    ])

    return super.create({userId: user.id, client, hash})
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
    user = serializeUser(user)

    const payload = JSON.stringify({
      ...user, id: this.userId, client, now: Date.now()
    })

    const hash = createHash("sha512").update(payload).digest("hex")

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken({...user, id: this.userId}), signRefreshToken({hash})
    ])

    return this.update({updatedAt: accessToken.signed, client, hash}, options)
      .then(() => ({accessToken, refreshToken}))
  }
}

Session.init({
  id: {
    type: t.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: t.INTEGER,
    allowNull: false,
    field: "user_id",
    references: {
      model: User,
      key: "id"
    }
  },
  hash: {
    type: t.STRING(128),
    unique: true,
    allowNull: false,
    comment: "A SHA512 has used as session's fingerprint"
  },
  clientBrowserName: {
    type: t.STRING,
    allowNull: false,
    field: "client_browser_name"
  },
  clientBrowserVersion: {
    type: t.STRING,
    allowNull: false,
    field: "client_browser_version"
  },
  clientOsName: {
    type: t.STRING,
    allowNull: false,
    field: "client_os_name"
  },
  clientOsVersion: {
    type: t.STRING,
    allowNull: false,
    field: "client_os_version"
  },
  clientIp: {
    type: t.STRING,
    allowNull: false,
    field: "client_ip"
  }
})

// Associations
Session.hasOne(User)
User.belongsToMany(Session)

export default Session
