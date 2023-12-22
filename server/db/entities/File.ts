import {Entity, Property, Unique, JsonType} from "@mikro-orm/mysql"

import {Record} from "./Record.js"

@Entity()
export class File<TMetadata extends object = any> extends Record {
  @Property({type: "varchar"})
  @Unique()
  key!: string

  @Property({type: "char", length: 128})
  sha512hash!: string

  @Property({type: "integer", unsigned: true})
  size!: number

  @Property({type: "varchar"})
  mime!: string

  @Property({type: JsonType, nullable: true})
  metadata!: TMetadata
}
