import {Op as op} from "sequelize"

const hooks = Category => ({
  async beforeCreate(category, options) {
    const count = await Category.count(options)

    category.order = count + 1
  },

  afterDestroy: (({id}, options) => Category.decrement("order", {
    ...options,

    where: {
      id: {
        [op.gt]: id
      }
    }
  }))
})

export default hooks
