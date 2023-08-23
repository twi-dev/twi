import {Property} from "@mikro-orm/core"

import type {MaybeNull} from "../../../lib/utils/types/MaybeNull.js"
import type {MergeOptionals} from "../../lib/db/utils/MergeOptionals.js"
import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"

import {Record} from "./Record.js"

export abstract class RecordSoft<
  TOptionalProps extends string = never
> extends Record<MergeOptionals<RecordSoftOptionalFields, TOptionalProps>> {
  @Property({type: "datetime", nullable: true})
  deletedAt: MaybeNull<Date> = null
}

type RecordSoftOptionalFields = PickKeys<RecordSoft, "deletedAt">
