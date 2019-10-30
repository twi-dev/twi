import {join} from "path"

import {readFile} from "promise-fs"

import first from "lodash/first"
import isEmpty from "lodash/isEmpty"

import createSlug from "core/helper/util/createSlug"

import categoriesData from "setup/db/data/categories.json"

async function loadTags(name) {
  let tags = []

  try {
    tags = await readFile(
      join(__dirname, "..", "data", `tags-${createSlug(name)}.json`),

      "utf8"
    )

    tags = JSON.parse(tags)
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err
    }
  }

  return tags
}

const up = q => q.sequelize.transaction(async transaction => {
  let categories = await q.bulkInsert(
    "categories",

    categoriesData.map(
      (name, order) => ({
        name,
        slug: createSlug(name),
        order: order + 1,
        created_at: new Date(),
        updated_at: new Date()
      })
    ),

    {
      transaction
    }
  )

  categories = await q.sequelize.query(
    "SELECT * FROM categories",

    {transaction}
  ).then(first)

  categories = await Promise.all(
    categories.map(
      ({id, name}) => loadTags(name).then(tags => ({id, tags}))
    )
  )

  await Promise.all(
    categories
      .filter(({tags}) => !isEmpty(tags))
      .map(
        ({id, tags}) => q.bulkInsert(
          "tags",

          tags.map(
            name => ({
              name,
              slug:
              createSlug(name),
              category_id: id,
              created_at: new Date(),
              updated_at: new Date()
            })
          ),

          {
            transaction
          }
        )
      )
  )
})

const down = q => q.sequelize.transaction(transaction => (
  q.bulkDelete("categories", {transaction})
))

export {up, down}
