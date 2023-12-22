import {resolve, join, extname} from "node:path"
import {pipeline} from "node:stream/promises"
import {createWriteStream} from "node:fs"
import {stat} from "node:fs/promises"

import {parseAsync} from "valibot"
import {ensureDir} from "fs-extra"
import {format} from "date-fns"
import {nanoid} from "nanoid"

import {match} from "type-is"

import type {
  ArbitaryUnionString
} from "../../../../lib/utils/types/ArbitaryUnionString.js"
import {
  createHashFromFileContent
} from "../../utils/createHashFromFileContent.js"
import {store} from "../store.js"

import {Metadata} from "./types/Metadata.js"
import {getFileIdFromUrl} from "./getFileIdFromUrl.js"

const DEST_ROOT = resolve("public", "uploads")

export interface MoveUploadedFileUploadKinds {
  user: ArbitaryUnionString<"avatar">
  story: ArbitaryUnionString<"cover" | "attachment">
  chapter: ArbitaryUnionString<"cover" | "attachment">
}

export type MoveUploadedFileValidOwners = keyof MoveUploadedFileUploadKinds

type Owners = ArbitaryUnionString<MoveUploadedFileValidOwners>

type GetKindByOwner<TOwner extends Owners> =
  TOwner extends MoveUploadedFileValidOwners
    ? MoveUploadedFileUploadKinds[TOwner]
    : string

interface MoveUploadedFileParams<TOwner extends Owners> {
  /**
   * Upload ID or upload URL
   */
  id: string

  /**
   * Upload's owner type (e. g., "user", "story", etc.)
   *
   * Could be one of MoveUploadedFileValidOwners or arbitary string
   */
  owner: TOwner

  /**
   * Upload's kind. By default value is based of the `owner` type, so you'll get autocompletions for pre-build valid owners
   *
   * This also could also be an arbitary string
   */
  kind: GetKindByOwner<TOwner>

  /**
   * Specifies valid mime types for upload
   */
  accepts?: string
}

export interface MoveUploadedFileResult {
  key: string
  size: number
  path: string
  sha512hash: string
  mime: string
}

const getDate = (): string => format(new Date(), "yyyy-MM-dd")

/**
 * Moves a single file from given `params.from` path to `uploads/` directory.
 */
export async function moveUploadedFile<
  TOwner extends Owners
>(params: MoveUploadedFileParams<TOwner>): Promise<MoveUploadedFileResult> {
  const {id, owner, kind, accepts} = params

  const uploadId = getFileIdFromUrl(id)
  const upload = await store.getUpload(uploadId)
  const metadata = await parseAsync(Metadata, upload.metadata)

  if (accepts && match(accepts, metadata.type) === false) {
    throw new Error("File type mismatch")
  }

  // Create destination paths and file key
  const destBasePath = join(getDate(), owner, kind)
  const destDir = join(DEST_ROOT, destBasePath)
  const key = join(destBasePath, `${nanoid()}${extname(metadata.name)}`)
  const dest = join(DEST_ROOT, key)

  const stream = store.read(uploadId)

  // Copy file to destination path
  await ensureDir(destDir)
  await pipeline(stream, createWriteStream(dest))

  const sha512hash = await createHashFromFileContent("sha512", stream)

  let size: number
  if (upload.size) {
    size = upload.size
  } else {
    const stats = await stat(dest)

    size = stats.size
  }

  // Cleanup
  await store.remove(uploadId)

  return {key, size, sha512hash, path: dest, mime: metadata.type}
}
