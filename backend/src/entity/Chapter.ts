import {Entity, Column, ManyToOne} from "typeorm"
import {ObjectType, Field, Int} from "type-graphql"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import {Story} from "./Story"

@ObjectType()
@Entity()
export class Chapter extends SoftRemovableEntity {
  @Column({unsigned: true})
  storyId!: number

  @ManyToOne(() => Story, {onDelete: "CASCADE", eager: true})
  story!: Story

  @Field(() => Int)
  @Column({type: "tinyint", unsigned: true, default: null})
  order?: number | null

  @Field()
  @Column()
  title!: string

  @Field({nullable: true})
  @Column({type: "text", default: null})
  description?: string

  @Field()
  @Column({type: "mediumtext"})
  text!: string

  @Field()
  @Column({default: true})
  isDraft!: boolean
}
