import {join} from "path"

import {readFile} from "promise-fs"

import last from "lodash/last"
import first from "lodash/first"
import isEmpty from "lodash/isEmpty"

import waterfall from "core/helper/array/runWaterfall"

import normalize from "setup/db/helper/normalizeCategoryOrTag"

const up = q => q.sequelize.transaction(async transaction => {
  let categories = await waterfall([
    () => readFile(join(__dirname, "..", "categories.json")),

    content => JSON.parse(content),

    list => list.map(normalize)
  ])

  const exists = await q.sequelize.query(
    "SELECT * FROM categories WHERE slug IN (:categories)",

    {
      transaction,

      raw: true,
      replacements: {
        categories: categories.map(({slug}) => slug)
      }
    }
  ).then(first)

  categories = categories
    .filter(name => !exists.some(category => category.name === name))

  // Do nothing and exit if no new categories found
  if (isEmpty(categories)) {
    return undefined
  }

  const {order} = last(exists)

  return q.bulkInsert(
    "categories",

    categories.map((category, index) => ({
      ...normalize(category),

      order: isEmpty(categories) ? index + 1 : order + index + 1
    })),

    {
      transaction
    }
  )
})

const down = q => q.sequelize.transaction(transaction => (
  q.bulkDelete("categories", {transaction})
))

export {up, down}
