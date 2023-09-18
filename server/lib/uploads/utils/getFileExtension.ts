import {extname} from "node:path"

import mime from "mime-types"

import type {
  MaybeUndefined
} from "../../../../lib/utils/types/MaybeUndefined.js"

import type {Metadata} from "./types/Metadata.js"

const normalizeExtension = (value: string) => value.replace(/^\.?/, "")

export function getFileExtension(metadata: Metadata): MaybeUndefined<string> {
  const name = metadata.filename || metadata.name || undefined
  const mimeType = metadata.filetype || metadata.type || undefined

  if (name) {
    return normalizeExtension(extname(name))
  }

  if (!mimeType) {
    return undefined
  }

  // eslint-disable-next-line import/no-named-as-default-member
  const ext = mime.extension(mimeType)
  if (ext) {
    return normalizeExtension(ext)
  }

  return undefined
}
