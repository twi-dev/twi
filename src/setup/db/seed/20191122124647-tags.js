import {join} from "path"

import {readFile} from "promise-fs"
import {Op as op} from "sequelize"

import isEmpty from "lodash/isEmpty"

import flat from "lib/helper/array/flat"
import waterfall from "lib/helper/array/runWaterfall"

import loadCategories from "setup/db/helper/loadCategories"
import normalize from "setup/db/helper/normalizeTag"

async function loadTag(category) {
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

async function loadTags(categories) {
  categories = await Promise.all(
    categories.map(
      ({categoryId, slug}) => loadTag(slug).then(tags => ({categoryId, tags}))
    )
  )

  const tags = flat(
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

  return tags
}

const up = q => q.sequelize.transaction(async transaction => {
  const [categories] = await q.sequelize.query(
    "SELECT id as categoryId, slug FROM categories",

    {
      transaction,

      raw: true
    }
  )

  let tags = await loadTags(categories)

  if (isEmpty(tags)) {
    return undefined
  }

  const [exists] = await q.sequelize.query(
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

const down = q => q.sequelize.transaction(async transaction => {
  const categories = await loadCategories()
    .then(list => list.map(({slug}) => slug))

  const tags = await waterfall([
    () => Promise.all(
      categories.map(({slug}) => loadTag(slug).then(list => list))
    ),

    list => list.map(({slug}) => slug)
  ])

  return q.bulkDelete("tags", {slug: {[op.in]: tags}}, {transaction})
})

export {up, down}
