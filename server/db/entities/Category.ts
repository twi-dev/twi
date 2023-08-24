import {Entity, Property, OneToMany, Collection} from "@mikro-orm/core"

import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"
import {createSlug} from "../../lib/utils/slug/createSlug.js"

import {RecordSoft} from "./RecordSoft.js"
import {Tag} from "./Tag.js"

@Entity()
export class Category extends RecordSoft<CategoryOptionalFields> {
  /**
   * Category name
   */
  @Property({type: "varchar", unique: true})
  name!: string

  /**
   * Unique URL-friendly identifier
   */
  @Property({type: "varchar", unique: true})
  slug!: string

  /**
   * Category order
   */
  @Property({type: "smallint", unsigned: true})
  order!: number

  /**
   * List of tags associated with category
   */
  @OneToMany(() => Tag, tag => tag.category)
  tags = new Collection<Tag, Category>(this)

  constructor(name: string) {
    super()

    this.name = name
    this.slug = createSlug(name)
  }
}

type CategoryOptionalFields = PickKeys<Category, "slug" | "order" | "tags">
