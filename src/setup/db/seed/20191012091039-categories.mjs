import {join} from "path"

import {readFile} from "promise-fs"

import last from "lodash/last"
import first from "lodash/first"
import isEmpty from "lodash/isEmpty"

import waterfall from "core/helper/array/runWaterfall"

import normalize from "setup/db/helper/normalizeCategoryOrTag"

const up = q => q.sequelize.transaction(async transaction => {
  let categories = await waterfall([
    () => readFile(join(__dirname, "..", "data", "categories.json")),

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
    .filter(({slug}) => !exists.some(category => category.slug === slug))

  // Do nothing and exit if no new categories found
  if (isEmpty(categories)) {
    return undefined
  }

  const shift = isEmpty(exists) ? 0 : last(exists).order

  return q.bulkInsert(
    "categories",

    categories.map((category, index) => ({
      ...normalize(category),

      order: shift + index + 1
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
