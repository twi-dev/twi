import {resolve, join, parse} from "node:path"

import {ensureDir, move} from "fs-extra/esm.mjs"
import {format} from "date-fns"
import {nanoid} from "nanoid"

import type {
  ArbitaryUnionString
} from "../../../../lib/utils/types/ArbitaryUnionString.js"

const DEST_ROOT = resolve("public", "uploads")

export interface MoveFileUploadKinds {
  user: ArbitaryUnionString<"avatar">
  story: ArbitaryUnionString<"cover" | "attachment">
  chapter: ArbitaryUnionString<"cover" | "attachment">
}

export type MoveFileValidOwners = keyof MoveFileUploadKinds

type Owners = MoveFileValidOwners | (string & {})

type GetKindByOwner<TOwner extends Owners> =
  TOwner extends MoveFileValidOwners ? MoveFileUploadKinds[TOwner] : string

interface MoveFileParams<TOwner extends Owners> {
  /**
   * Source path of a file
   */
  from: string

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
}

export interface MoveFileResult {
  key: string
}

const getDate = (): string => format(new Date(), "yyyy-MM-DD")

/**
 * Moves a single file from given `params.from` path to `uploads/` directory.
 */
export async function moveFile<
  TOwner extends Owners
>(params: MoveFileParams<TOwner>): Promise<MoveFileResult> {
  const {from: fromPath, owner, kind} = params
  const {ext} = parse(fromPath)

  const destBasePath = join(getDate(), owner, kind)
  const destDir = join(DEST_ROOT, destBasePath)
  const key = join(destBasePath, `${nanoid()}${ext}`)
  const dest = join(destDir, key)

  await ensureDir(destDir)
  await move(fromPath, dest)

  return {key}
}
