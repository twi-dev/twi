import {Op as op} from "sequelize"

import bind from "lib/helper/graphql/normalizeParams"

import Tag from "model/Tag"

function getTag({args}) {
  const {id, slug} = args

  return Tag.findOne({where: {[op.or]: [{id}, {slug}]}})
}

export default getTag |> bind
