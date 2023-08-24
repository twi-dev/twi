import {Property} from "@mikro-orm/core"

import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"
import type {MergeOptionals} from "../../lib/db/utils/MergeOptionals.js"

import {Node} from "./Node.js"

export abstract class Record<
  TOptionalProps extends string = never
> extends Node<MergeOptionals<RecordOptionalProps, TOptionalProps>> {
  @Property({type: "datetime"})
  createdAt = new Date()

  @Property({type: "datetime", onUpdate: () => new Date()})
  updatedAt = new Date()
}

type RecordOptionalProps = PickKeys<Record, "createdAt" | "updatedAt">
