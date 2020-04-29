import {Op as op} from "sequelize"

/**
 * @typedef {import("./Category").default} Category
 */

/**
 * @param {Category} Category
 */
const hooks = Category => ({
  /**
   *
   * @param {Category} category
   * @param {Object<string, any>} [options]
   */
  async beforeCreate(category, options) {
    const count = await Category.count(options)

    category.order = count + 1
  },

  /**
   * @param {Object} category
   * @param {number} category.id
   */
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
