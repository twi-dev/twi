import {resolve} from "path"

import {readFile} from "promise-fs"

import categoriesData from "setup/db/data/categories.json"

const loadTags = name => (
  readFile(resolve("..", "data", `tags-${name}.json`), "utf8")
    .then(content => JSON.stringify(content))
)

async function up(q) {
  let categories = await q.bulkInsert(
    "categories",

    categoriesData.map((name, order) => ({name, order: order + 1}))
  )

  categories = await Promise.all(
    categories.map(
      ({id, name}) => loadTags(name).then(tags => ({id, tags}))
    )
  )

  await Promise.all(
    categories.map(
      ({id, tags}) => q.bulkInsert(
        "tags",

        tags.map(name => ({categoryId: id, name}))
      )
    )
  )
}

const down = q => q.bulkDelete("categories", null)

export {up, down}
