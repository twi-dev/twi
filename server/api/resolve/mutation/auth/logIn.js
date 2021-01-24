import {Op as op} from "sequelize"

import omit from "lodash/omit"

import db from "lib/db/connection"
import bind from "lib/helper/graphql/normalizeParams"
import Unauthorized from "lib/error/http/Unauthorized"

import Session from "model/Session"
import User from "model/User"

/**
 * @typedef {import("model/Session/util/signToken").AuthToken} AuthToken
 */

/**
 * @typedef {Object} UserCredentials
 * @prop {string} username
 * @prop {string} password
 */

/**
 * @param {Object} params
 * @param {UserCredentials} params.args
 * @param {import("koa").Context} params.ctx
 *
 * @return {Promise<AuthToken>}
 */
const logIn = ({args, ctx}) => db.transaction(async transaction => {
  const {username, password} = args.user
  const {client} = ctx.state

  const user = await User.findOne(
    {
      where: {
        [op.or]: [
          {
            email: username
          },
          {
            login: username
          }
        ]
      }
    },

    {
      transaction
    }
  )

  if (!user || (user && await user.comparePassword(password) === false)) {
    throw new Unauthorized(
      "Can't authenticate user. Check your credentials and try again."
    )
  }

  return Session.sign({
    client, user: omit(user.toJSON(), "password")
  }, {transaction})
})

export default logIn |> bind
