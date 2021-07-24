import {ObjectType, Field} from "type-graphql"
import {
  Entity,
  Property,
  Collection,
  OneToMany,
  EntityRepositoryType
} from "@mikro-orm/core"

import {CategoryRepo} from "repo/CategoryRepo"

import {BaseEntitySoftRemovable} from "./BaseEntitySoftRemovable"
import {Tag} from "./Tag"

@ObjectType()
@Entity({customRepository: () => CategoryRepo})
export class Category extends BaseEntitySoftRemovable {
  [EntityRepositoryType]: CategoryRepo

  @OneToMany(() => Tag, tag => tag.category)
  tags = new Collection<Tag, Category>(this)

  /**
   * Category name.
   */
  @Field({description: "Category name."})
  @Property({unique: true})
  name!: string

  /**
   * Category prefix.
   */
  @Field()
  @Property({unique: true})
  prefix!: string

  @Field()
  @Property({columnType: "smallint", unsigned: true})
  order!: number
}
