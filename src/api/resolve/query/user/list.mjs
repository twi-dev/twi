import {Op as op} from "sequelize"

import bind from "core/helper/graphql/normalizeParams"

import User from "model/User"

const list = () => User.findAll({
  where: {status: {[op.ne]: User.statuses.inactive}}
})

export default bind(list)
