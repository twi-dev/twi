import {Entity, Property, ManyToOne} from "@mikro-orm/core"

import type {MaybeNull} from "../../../lib/utils/types/MaybeNull.js"
import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"
import {createSlug} from "../../lib/utils/slug/createSlug.js"

import {RecordSoft} from "./RecordSoft.js"
import {Category} from "./Category.js"

// TODO(octet-stream): I Should probably reconsider the way categories associate with tags.
// TODO(octet-stream): Maybe setup m:n relation between Tag and Category? So that a category may have
// TODO(octet-stream): multiple tags and tag can be included in multiple categories
@Entity()
export class Tag extends RecordSoft<TagOptionalFields> {
  /**
   * Name of the tag
   */
  @Property({type: "varchar"})
  readonly name!: string

  /**
   * URL-firendly representation of the tag's name
   */
  @Property({type: "varchar"})
  readonly slug!: string

  /**
   * An optional tag description.
   */
  @Property({type: "text", nullable: true})
  description!: MaybeNull<string>

  /**
   * Category assigned to the tag
   */
  @ManyToOne(() => Category, {nullable: true, onDelete: "set null"})
  category!: MaybeNull<string>

  constructor(name: string) {
    super()

    this.name = name
    this.slug = createSlug(name)
  }
}

type TagOptionalFields = PickKeys<Tag, "slug" | "description" | "category">
