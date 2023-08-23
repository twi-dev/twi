import {randomUUID} from "node:crypto"

import {PrimaryKey, OptionalProps} from "@mikro-orm/core"

export abstract class Node<TOptionalFields = never> {
  [OptionalProps]?: TOptionalFields

  @PrimaryKey({type: "uuid"})
  readonly id: string = randomUUID()
}
