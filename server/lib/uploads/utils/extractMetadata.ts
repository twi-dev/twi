import type {IncomingMessage} from "node:http"

import {MaybeUndefined} from "../../../../lib/utils/types/MaybeUndefined.js"
import {MaybeNull} from "../../../../lib/utils/types/MaybeNull.js"

export interface Metadata {
  relativePath?: MaybeNull<string>
  name?: MaybeNull<string>
  type?: MaybeNull<string>
  filetype?: MaybeNull<string>
  filename?: MaybeNull<string>
}

const metadataHeaderKey = "upload-metadata"

export function extractMetadata(
  req: IncomingMessage
): MaybeUndefined<Metadata> {
  const raw = req.headers[metadataHeaderKey] as MaybeUndefined<string>

  if (!raw) {
    return undefined
  }

  const entries = raw
    .split(/\s*,\s*/)
    .map(entry => entry.split(/\s+/))
    .map(([key, value]) => [key, Buffer.from(value, "base64").toString()])

  return Object.fromEntries(entries) as Metadata
}
