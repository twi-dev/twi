import {Op as op} from "sequelize"

import bind from "core/helper/graphql/normalizeParams"
import pagination from "core/helper/db/pagination"
import toPage from "core/helper/graphql/toPage"

import User from "model/User"

const where = {status: {[op.ne]: User.statuses.inactive}}
const attributes = {exclude: ["password"]}

function getUsers({args}) {
  const pageInfo = pagination(args)

  return User.findAndCountAll({...pageInfo, where, attributes})
    .then(toPage(pageInfo))
}

export default getUsers |> bind
