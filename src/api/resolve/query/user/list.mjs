import {Op as op} from "sequelize"

import bind from "core/helper/graphql/normalizeParams"
import pagination from "core/helper/db/pagination"
import toPage from "core/helper/graphql/toPage"

import User from "model/User"

const getUsers = ({args}) => User.findAndCountAll({
  ...pagination(args),

  where: {status: {[op.ne]: User.statuses.inactive}},
  attributes: {exclude: ["password"]}
}).then(toPage(pagination(args)))

export default getUsers |> bind
