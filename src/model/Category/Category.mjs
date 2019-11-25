import {Model, Op as op} from "sequelize"

import createModel from "core/db/createModel"

import schema from "./schema"

@createModel(schema)
class Category extends Model { }

Category.beforeCreate(async (category, options) => {
  const count = await Category.count(options)

  category.order = count + 1
})

Category.afterDestroy(({id}, options) => Category.decrement(
  "order",

  {
    ...options,

    where: {
      [op.gt]: id
    }
  }
))

export default Category
