import {Entity, Property, Collection, OneToMany} from "@mikro-orm/core"
import {ObjectType, Field} from "type-graphql"

import {BaseEntitySoftRemovable} from "./BaseEntitySoftRemovable"
import {Tag} from "./Tag"

@ObjectType()
@Entity()
export class Category extends BaseEntitySoftRemovable {
  @OneToMany(() => Tag, tag => tag.category)
  tags = new Collection<Tag, Category>(this)

  @Field()
  @Property({unique: true})
  name!: string

  @Field()
  @Property({unique: true})
  prefix!: string

  @Field()
  @Property({columnType: "smallint", unsigned: true})
  order!: number
}
