import {Entity, Property, ManyToMany, Collection, Unique} from "@mikro-orm/core"

import type {MaybeNull} from "../../../lib/utils/types/MaybeNull.js"
import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"
import {createSlug} from "../../lib/utils/slug/createSlug.js"

import {RecordSoft} from "./RecordSoft.js"
import {Category} from "./Category.js"

@Entity()
export class Tag extends RecordSoft<TagOptionalProps> {
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
  readonly slug: string

  /**
   * An optional tag description.
   */
  @Property({type: "text", nullable: true, default: null})
  description: MaybeNull<string> = null

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

type TagOptionalProps = PickKeys<Tag, "slug" | "description" | "category">
