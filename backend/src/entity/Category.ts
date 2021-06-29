import {ObjectType, Field, Int} from "type-graphql"
import {Entity, Column, OneToMany} from "typeorm"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import {Tag} from "./Tag"

@ObjectType()
@Entity()
export class Category extends SoftRemovableEntity {
  @OneToMany(() => Tag, tag => tag.category)
  tags!: Tag[] | null

  @Field()
  @Column()
  name!: string

  @Column()
  prefix?: string

  @Field(() => Int)
  @Column({type: "tinyint", unsigned: true})
  order!: number
}
