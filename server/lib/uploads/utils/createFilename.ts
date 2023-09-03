import type {IncomingMessage} from "node:http"

import {nanoid} from "nanoid"
import {format} from "date-fns"

import {extractMetadata} from "./extractMetadata.js"
import {getFileExtension} from "./getFileExtension.js"

const DATETIME_FORMAT = "yyyyMMddHHmmss"

export function createFilename(req: IncomingMessage): string {
  const base = `${format(Date.now(), DATETIME_FORMAT)}-${nanoid()}`

  const metadata = extractMetadata(req)
  if (!metadata) {
    return base
  }

  const ext = getFileExtension(metadata)
  if (!ext) {
    return base
  }

  return `${base}.${ext}`
}
