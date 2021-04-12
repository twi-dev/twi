import create from "@sindresorhus/slugify"

/**
 * @param string a value to slugify
 */
const createSlug = (string: string) => create(string, {
  customReplacements: [
    [":", " colon "],
    [",", " comma "],
    [".", " period "],
    ["@", " at "]
  ]
})

export default createSlug
