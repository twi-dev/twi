import {
  Entity,
  Property,
  ManyToMany,
  Unique,
  Collection,
  type Opt
} from "@mikro-orm/mysql"

import {createSlug} from "../../lib/utils/slug/createSlug.js"

import {RecordSoft} from "./RecordSoft.js"
import {Tag} from "./Tag.js"

@Entity()
export class Category extends RecordSoft {
  /**
   * Category name
   */
  @Property({type: "varchar"})
  @Unique()
  name!: string

  /**
   * Unique URL-friendly identifier
   */
  @Property({type: "varchar"})
  @Unique()
  slug!: Opt<string>

  /**
   * Category order
   */
  @Property({type: "smallint", unsigned: true})
  order!: Opt<number>

  /**
   * List of tags associated with category
   */
  @ManyToMany(() => Tag, "category", {lazy: true})
  tags = new Collection<Tag, Category>(this)

  constructor(name: string) {
    super()

    this.name = name
    this.slug = createSlug(name)
  }
}
