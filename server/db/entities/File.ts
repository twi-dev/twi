import {Entity, Property, Unique} from "@mikro-orm/core"

@Entity()
export class File {
  @Property({type: "varchar"})
  @Unique()
  key!: string
}
