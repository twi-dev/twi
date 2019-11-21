import {join} from "path"

import {readFile} from "promise-fs"

import isEmpty from "lodash/isEmpty"
import first from "lodash/first"

import flat from "core/helper/array/flat"

import normalize from "setup/db/helper/normalizeCategoryOrTag"

async function load(category) {
  let tags = []

  try {
    tags = await readFile(
      join(__dirname, "..", "data", `tags-${category}.json`),

      "utf8"
    ).then(JSON.parse)
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err
    }
  }

  return tags
}

const up = q => q.sequelize.transaction(async transaction => {
  let categories = await q.sequelize.query(
    "SELECT id as categoryId, slug FROM categories",

    {
      transaction,

      raw: true
    }
  ).then(first)

  categories = await Promise.all(
    categories.map(
      ({categoryId, slug}) => load(slug).then(tags => ({categoryId, tags}))
    )
  )

  let tags = flat(
    categories
      .filter(({tags: list}) => !isEmpty(list))
      .map(
        ({categoryId, tags: list}) => (
          list.map(tag => ({
            ...normalize(tag),

            category_id: categoryId
          }))
        )
      )
  )

  if (isEmpty(tags)) {
    return undefined
  }

  const exists = await q.sequelize.query(
    "SELECT slug FROM tags WHERE slug IN (:tags)",

    {
      transaction,

      raw: true,
      replacements: {
        tags: tags.map(({slug}) => slug)
      }
    }
  )

  tags = tags.filter(({slug}) => !exists.some(tag => tag.slug === slug))

  if (isEmpty(tags)) {
    return undefined
  }

  return q.bulkInsert("tags", tags, {transaction})
})

const down = q => q.sequelize.transaction(transaction => (
  q.bulkDelete("tags", {transaction})
))

export {up, down}
