import create from "@sindresorhus/slugify"

const customReplacements: readonly [key: string, replacement: string][] = [
  [":", "colon"],
  [",", "comma"],
  [".", "period"],
  ["@", "at"]
].map(([key, replacement]) => [key, ` ${replacement} `])

/**
 * @param string a value to slugify
 */
const createSlug = (string: string) => create(string, {customReplacements})

export default createSlug
