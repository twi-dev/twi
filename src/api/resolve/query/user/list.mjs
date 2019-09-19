import {Op as op} from "sequelize"

import bind from "core/helper/graphql/normalizeParams"
import pagination from "core/helper/db/pagination"
import toPage from "core/helper/graphql/toPage"

import Contacts from "model/Contacts"
import File from "model/File"
import User from "model/User"

const attributes = {exclude: ["password"]}
const where = {status: {[op.ne]: User.statuses.inactive}}

const include = [
  {
    model: Contacts,
    as: "contacts"
  },
  {
    model: File,
    as: "avatar"
  }
]

function getUsers({args}) {
  const pageInfo = pagination(args)

  return User.findAndCountAll({...pageInfo, include, where, attributes})
    .then(toPage(pageInfo))
}

export default getUsers |> bind
