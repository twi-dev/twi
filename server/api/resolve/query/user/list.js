import {Op as op} from "sequelize"

import getPageInfo from "server/lib/helper/graphql/getPageInfo"
import bind from "server/lib/helper/graphql/normalizeParams"
import toPage from "server/lib/helper/graphql/toPage"

import User from "server/model/User"
import File from "server/model/File"

const attributes = {exclude: ["password"]}
const where = {status: {[op.ne]: User.statuses.inactive}}

const include = [{
  model: File,
  as: "avatar"
}]

function getUsers({args}) {
  const pageInfo = getPageInfo(args)

  return User.findAndCountAll({...pageInfo, include, where, attributes})
    .then(toPage(pageInfo))
}

export default getUsers |> bind
