import {Entity, Property} from "@mikro-orm/core"

import {RecordSoft} from "./RecordSoft.js"

// TODO: Implement tags, chapters, cover, and pulibsher fields
@Entity()
export class Story extends RecordSoft {
  @Property({type: "varchar"})
  title!: string

  @Property({type: "text"}) // FIXME: Chose precise type for description, MySQL has different variants for TEXT
  description!: string

  @Property({type: "varchar", unique: true})
  slug!: string

  @Property({type: "boolean", default: true})
  isDraft = true

  @Property({type: "boolean", default: false})
  isFinished = true
}
