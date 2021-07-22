import {Entity, Property, ManyToOne} from "@mikro-orm/core"
import {ObjectType, Field, Int} from "type-graphql"

import {BaseEntitySoftRemovable} from "./BaseEntitySoftRemovable"
import {Story} from "./Story"

@ObjectType()
@Entity()
export class Chapter extends BaseEntitySoftRemovable {
  @ManyToOne(() => Story)
  story!: Story

  @Field(() => Int)
  @Property({columnType: "smallint", unsigned: true, nullable: true})
  number!: number | null

  @Field()
  @Property()
  title!: string

  @Field(() => String, {nullable: true})
  @Property({columnType: "text", nullable: true})
  description!: string | null

  @Field()
  @Property({columnType: "mediumtext"})
  text!: string

  @Field(() => Boolean)
  @Property()
  isDraft: boolean = true
}
