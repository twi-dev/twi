import {Entity, Property, Unique} from "@mikro-orm/core"

import {Record} from "./Record.js"

@Entity()
export class File extends Record {
  @Property({type: "varchar"})
  @Unique()
  key!: string
}
