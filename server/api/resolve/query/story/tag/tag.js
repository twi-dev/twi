import {Op as op} from "sequelize"

import bind from "server/lib/helper/graphql/normalizeParams"

import Tag from "server/model/Tag"

function getTag({args}) {
  const {id, slug} = args

  return Tag.findOne({where: {[op.or]: [{id}, {slug}]}})
}

export default getTag |> bind
