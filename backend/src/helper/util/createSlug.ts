import create from "@sindresorhus/slugify"

const customReplacements: readonly [string, string][] = [
  [":", "colon"],
  [",", "comma"],
  [".", "period"],
  ["@", "at"]
].map(([symbol, replacement]) => [symbol, ` ${replacement} `])

/**
 * @param string a value to slugify
 */
const createSlug = (string: string) => create(string, {customReplacements})

export default createSlug
