import {Entity, Property, OneToMany, Collection} from "@mikro-orm/core"

import type {PickKeys} from "../../../lib/utils/types/PickKeys.js"

import {RecordSoft} from "./RecordSoft.js"
import {Tag} from "./Tag.js"

@Entity()
export class Category extends RecordSoft<CategoryOptionalFields> {
  @OneToMany(() => Tag, tag => tag.category)
  tags = new Collection<Tag, Category>(this)

  @Property({type: "varchar", unique: true})
  name!: string

  @Property({type: "varchar", unique: true})
  prefix!: string

  @Property({type: "smallint", unsigned: true})
  order!: number
}

type CategoryOptionalFields = PickKeys<Category, never>
