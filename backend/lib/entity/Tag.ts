import {Entity, Column, ManyToOne} from "typeorm"
import {ObjectType, Field} from "type-graphql"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import {Category} from "./Category"

@ObjectType()
@Entity()
export class Tag extends SoftRemovableEntity {
  @Column({unsigned: true})
  categoryId?: string

  @ManyToOne(() => Category, {eager: true})
  category?: Category

  @Field()
  @Column()
  name!: string

  @Field()
  @Column()
  slug!: string

  @Field({nullable: true})
  @Column({type: "text"})
  description?: string
}

export default Tag
