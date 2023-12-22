import {
  Entity,
  Property,
  ManyToMany,
  Collection,
  Unique,
  type Opt
} from "@mikro-orm/mysql"

import type {MaybeNull} from "../../../lib/utils/types/MaybeNull.js"
import {createSlug} from "../../lib/utils/slug/createSlug.js"

import {RecordSoft} from "./RecordSoft.js"
import {Category} from "./Category.js"

@Entity()
export class Tag extends RecordSoft {
  /**
   * Name of the tag
   */
  @Property({type: "varchar"})
  readonly name: string

  /**
   * URL-firendly representation of the tag's name
   */
  @Property({type: "varchar"})
  @Unique()
  readonly slug: Opt<string>

  /**
   * An optional tag description.
   */
  @Property({type: "text", nullable: true, default: null})
  description: MaybeNull<Opt<string>> = null

  /**
   * List of the categories associated with tag
   */
  @ManyToMany(() => Category, "tags", {lazy: true, owner: true})
  category = new Collection<Category, Tag>(this)

  /**
   * Creates a new `Tag` instance.
   *
   * @param name The name to assign to a new tag. This name will also be used to create a slug, to keep it unique.
   */
  constructor(name: string) {
    super()

    this.name = name
    this.slug = createSlug(name)
  }
}
