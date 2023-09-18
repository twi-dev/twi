import {v4} from "uuid"

import {PrimaryKey, OptionalProps} from "@mikro-orm/core"

export abstract class Node<TOptionalFields = never> {
  [OptionalProps]?: TOptionalFields

  @PrimaryKey({type: "uuid"})
  readonly id: string = v4()
}
