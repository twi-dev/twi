import type {IncomingMessage} from "node:http"
import {createHash} from "node:crypto"

import {nanoid} from "nanoid"
import {parse} from "valibot"

import {
  Metadata,
  type OMetadata
} from "./types/Metadata.js"

import {extractMetadata} from "./extractMetadata.js"

interface HashPayload {
  date: number
  metadata?: OMetadata
  randomness: string
}

export function createFilename(req: IncomingMessage): string {
  const hash = createHash("sha256")

  const payload: HashPayload = {
    date: Date.now(),
    metadata: parse(Metadata, extractMetadata(req)),
    randomness: nanoid()
  }

  return hash.update(JSON.stringify(payload)).digest("hex")
}
