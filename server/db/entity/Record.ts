import {Property, OptionalProps} from "@mikro-orm/core"

import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"

import {Node} from "./Node.js"

export abstract class Record<
  TOptionalProps extends string = RecordOptionalFields
> extends Node {
  [OptionalProps]?: TOptionalProps

  @Property({type: "datetime"})
  createdAt = new Date()

  @Property({type: "datetime", onUpdate: () => new Date()})
  updatedAt = new Date()
}

export type RecordOptionalFields = PickKeys<Record, "createdAt" | "updatedAt">
