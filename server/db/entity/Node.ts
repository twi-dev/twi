import {randomUUID} from "node:crypto"

import {PrimaryKey} from "@mikro-orm/core"

export abstract class Node {
  @PrimaryKey({type: "uuid"})
  readonly id = randomUUID()
}
