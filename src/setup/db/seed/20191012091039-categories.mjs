import last from "lodash/last"
import isEmpty from "lodash/isEmpty"

import {Op as op} from "sequelize"

import load from "setup/db/helper/loadCategories"

const up = q => q.sequelize.transaction(async transaction => {
  let categories = await load()

  const [exists] = await q.sequelize.query(
    "SELECT * FROM categories WHERE slug IN (:categories)",

    {
      transaction,

      raw: true,
      replacements: {
        categories: categories.map(({slug}) => slug)
      }
    }
  )

  categories = categories
    .filter(({slug}) => !exists.some(category => category.slug === slug))

  // Do nothing and exit if no new categories found
  if (isEmpty(categories)) {
    return undefined
  }

  const shift = isEmpty(exists) ? 0 : last(exists).order

  return q.bulkInsert(
    "categories",

    categories.map((category, index) => ({
      ...category,

      order: shift + index + 1
    })),

    {
      transaction
    }
  )
})

const down = q => q.sequelize.transaction(async transaction => {
  const categories = await load().then(list => list.map(({slug}) => slug))

  return q.bulkDelete(
    "categories",

    {
      slug: {
        [op.in]: categories
      }
    },

    {
      transaction
    }
  )
})

export {up, down}
