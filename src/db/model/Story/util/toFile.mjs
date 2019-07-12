import {join, basename, extname} from "path"
import {tmpdir} from "os"

import {writeFile} from "promise-fs"

import nanoid from "nanoid/async"
import mime from "mime-types"

async function toFile(content) {
  const path = join(tmpdir(), `${await nanoid()}.md`)
  const ext = extname(path)

  await writeFile(path, content, "utf-8")

  return {
    extname: ext,
    mime: mime.lookup(path),
    filename: basename(path),
    basename: basename(path, ext)
  }
}

export default toFile
