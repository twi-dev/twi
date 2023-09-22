import {resolve, join, extname} from "node:path"
import {pipeline} from "node:stream/promises"
import {createWriteStream} from "node:fs"
import {stat} from "node:fs/promises"

import {ensureDir} from "fs-extra"
import {format} from "date-fns"
import {nanoid} from "nanoid"

import {match} from "type-is"

import type {
  ArbitaryUnionString
} from "../../../../lib/utils/types/ArbitaryUnionString.js"
import {store} from "../store.js"

import {Metadata} from "./types/Metadata.js"
import {getFileIdFromUrl} from "./getFileIdFromUrl.js"

const DEST_ROOT = resolve("public", "uploads")

export interface MoveFileUploadKinds {
  user: ArbitaryUnionString<"avatar">
  story: ArbitaryUnionString<"cover" | "attachment">
  chapter: ArbitaryUnionString<"cover" | "attachment">
}

export type MoveFileValidOwners = keyof MoveFileUploadKinds

type Owners = ArbitaryUnionString<MoveFileValidOwners>

type GetKindByOwner<TOwner extends Owners> =
  TOwner extends MoveFileValidOwners ? MoveFileUploadKinds[TOwner] : string

interface MoveFileParams<TOwner extends Owners> {
  /**
   * Upload ID or upload URL
   */
  id: string

  /**
   * Upload's owner type (e. g., "user", "story", etc.)
   *
   * Could be one of MoveFileValidOwners or arbitary string
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

export interface FileMetadata {
  key: string
  size: number
  path: string
}

const getDate = (): string => format(new Date(), "yyyy-MM-dd")

/**
 * Moves a single file from given `params.from` path to `uploads/` directory.
 */
export async function moveUploadedFile<
  TOwner extends Owners
>(params: MoveFileParams<TOwner>): Promise<FileMetadata> {
  const {id, owner, kind, accepts} = params

  const uploadId = getFileIdFromUrl(id)
  const upload = await store.getUpload(uploadId)
  const metadata = await Metadata.parseAsync(upload.metadata)

  if (accepts && match(accepts, metadata.type) === false) {
    throw new Error("File type mismatch")
  }

  // Create destination paths and file key
  const destBasePath = join(getDate(), owner, kind)
  const destDir = join(DEST_ROOT, destBasePath)
  const key = join(destBasePath, `${nanoid()}${extname(metadata.name)}`)
  const dest = join(DEST_ROOT, key)

  // Copy file to destination path
  await ensureDir(destDir)
  await pipeline(store.read(uploadId), createWriteStream(dest))

  // Cleanup
  await store.remove(uploadId)

  let size: number
  if (upload.size) {
    size = upload.size
  } else {
    const stats = await stat(dest)

    size = stats.size
  }

  return {key, size, path: dest}
}
