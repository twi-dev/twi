import {TypeormLoader} from "type-graphql-dataloader"
import {ObjectType, Field, Int} from "type-graphql"
import {Entity, Column, ManyToOne} from "typeorm"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import {Story} from "./Story"

@ObjectType()
@Entity()
export class Chapter extends SoftRemovableEntity {
  @ManyToOne(() => Story, story => story.chapters, {nullable: false})
  @TypeormLoader()
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
