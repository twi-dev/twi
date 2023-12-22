import {Property, type Opt} from "@mikro-orm/mysql"

import {Node} from "./Node.js"

export abstract class Record extends Node {
  @Property({type: "datetime"})
  createdAt: Opt<Date> = new Date()

  @Property({type: "datetime", onUpdate: () => new Date()})
  updatedAt: Opt<Date> = new Date()
}
