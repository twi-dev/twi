import {resolve, isAbsolute, extname} from "path"

import globby from "globby"

export const EXTNAME = extname(__filename)

export const EXCLUDE_FILES: readonly string[] = ["*.test"]
  .map(name => `${name}${EXTNAME}`)

export const EXCLUDE_DIRS: readonly string[] = [
  "__helper__",
  "__fixture__",
  "__macro__"
]

export const EXCLUDE_PATTERNS: readonly string[] = [
  ...EXCLUDE_DIRS,
  ...EXCLUDE_FILES
].map(name => `!${name}`)

export async function* readDir(dir: string, pattern = "*") {
  if (!isAbsolute(dir)) {
    throw new Error("Path to the directory must be absolute")
  }

  dir = resolve(dir, `${pattern}${EXTNAME}`)

  for await (const path of globby.stream([dir, ...EXCLUDE_PATTERNS])) {
    yield String(path)
  }
}
