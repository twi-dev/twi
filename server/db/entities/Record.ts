import {Property, type Opt} from "@mikro-orm/mysql"

import {Node} from "./Node.js"

export abstract class Record extends Node {
  /**
   * Date and time the record has been created
   */
  @Property({type: "datetime"})
  createdAt: Opt<Date> = new Date()

  /**
   * Date and tine of the record's most recent update
   */
  @Property({type: "datetime", onUpdate: () => new Date()})
  updatedAt: Opt<Date> = new Date()
}
