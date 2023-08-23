import create from "@sindresorhus/slugify"

const customReplacements: readonly [key: string, replacement: string][] = [
  [":", "colon"],
  [",", "comma"],
  [".", "period"],
  ["@", "at"]
].map(([key, replacement]) => [key, ` ${replacement} `])

/**
 * Creates URL-friendly `slug` from given `input`
 *
 * @param input a value to slugify
 */
export const createSlug = (input: string) => create(input, {
  customReplacements
})
