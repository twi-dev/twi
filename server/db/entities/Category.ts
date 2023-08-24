import {Entity, Property, OneToMany, Collection} from "@mikro-orm/core"

import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"
import {createSlug} from "../../lib/utils/createSlug.js"

import {RecordSoft} from "./RecordSoft.js"
import {Tag} from "./Tag.js"

@Entity()
export class Category extends RecordSoft<CategoryOptionalFields> {
  @Property({type: "varchar", unique: true})
  name!: string

  @Property({type: "varchar", unique: true})
  slug!: string

  @Property({type: "smallint", unsigned: true})
  order!: number

  @OneToMany(() => Tag, tag => tag.category)
  tags = new Collection<Tag, Category>(this)

  constructor(name: string) {
    super()

    this.name = name
    this.slug = createSlug(name)
  }
}

type CategoryOptionalFields = PickKeys<Category, never>
