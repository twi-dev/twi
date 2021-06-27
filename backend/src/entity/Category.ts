import {ObjectType, Field, Int} from "type-graphql"
import {Entity, Column} from "typeorm"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

@ObjectType()
@Entity()
export class Category extends SoftRemovableEntity {
  @Field()
  @Column()
  name!: string

  @Column()
  prefix?: string

  @Field(() => Int)
  @Column({type: "tinyint", unsigned: true})
  order!: number
}
