import {Op as op} from "sequelize"

import bind from "core/helper/graphql/normalizeParams"
import pagination from "core/helper/db/pagination"

import User from "model/User"

const list = ({args}) => User.findAll({
  ...pagination(args),

  where: {status: {[op.ne]: User.statuses.inactive}},
  attributes: {exclude: ["password"]}
})

export default bind(list)
