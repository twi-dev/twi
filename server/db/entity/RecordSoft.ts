import {Property} from "@mikro-orm/core"

import type {MaybeNull} from "../../../lib/utils/types/MaybeNull.js"
import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"

import {Record, type RecordOptionalFields} from "./Record.js"

// TODO: Merge given optionals
export abstract class RecordSoft extends Record<RecordSoftOptionalFields> {
  @Property({type: "datetime", nullable: true})
  deletedAt: MaybeNull<Date> = null
}

export type RecordSoftOptionalFields =
  PickKeys<RecordSoft, RecordOptionalFields | "deletedAt">
