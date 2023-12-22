import {v4} from "uuid"

import {PrimaryKey} from "@mikro-orm/mysql"

export abstract class Node {
  @PrimaryKey({type: "uuid"})
  readonly id: string = v4()
}
