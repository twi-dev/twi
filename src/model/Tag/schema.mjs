import {DataTypes as t} from "sequelize"

import slugify from "@sindresorhus/slugify"
import partial from "lodash/partial"

const slug = partial(slugify, [partial.placeholder, {
  customReplacements: [
    [":", " colon "],
    [",", " comma "],
    [".", " period "],
    ["@", " at "]
  ]
}])

const schema = {
  name: {
    type: t.STRING,
    allowNull: false,

    set(name) {
      this.setDataValue("name", name)
      this.setDataValue("slug", slug(name))
    }
  },
  description: t.STRING,
  slug: {
    type: t.STRING,
    allowNull: false
  }
}

export default schema
