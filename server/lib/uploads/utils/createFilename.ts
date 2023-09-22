import type {IncomingMessage} from "node:http"
import {createHash} from "node:crypto"

import {nanoid} from "nanoid"

import {
  Metadata,
  type OMetadata
} from "./types/Metadata.js"

import {extractMetadata} from "./extractMetadata.js"

interface HashPayload {
  date: string
  metadata?: OMetadata
  randomness: string
}

export function createFilename(req: IncomingMessage): string {
  const hash = createHash("sha256")

  const payload: HashPayload = {
    date: new Date().toISOString(),
    metadata: Metadata.parse(extractMetadata(req)),
    randomness: nanoid()
  }

  return hash.update(JSON.stringify(payload)).digest("hex")
}
