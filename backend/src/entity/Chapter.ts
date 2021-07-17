import {TypeormLoader} from "type-graphql-dataloader"
import {ObjectType, Field, Int} from "type-graphql"
import {Entity, Column, ManyToOne} from "typeorm"

import {BaseSoftRemovableEntity} from "entity/abstract/BaseSoftRemovableEntity"

import {Story} from "./Story"

@ObjectType()
@Entity()
export class Chapter extends BaseSoftRemovableEntity {
  @Column({unsigned: true, nullable: false})
  storyId!: number

  @ManyToOne(() => Story, story => story.chapters, {nullable: false})
  @TypeormLoader()
  story!: Story

  /**
   * Chapter number within the story.
   *
   * The value will be "null" when the chapter is unlisted or soft-removed.
   */
  @Field(() => Int, {description: "Chapter number within the story."})
  @Column({type: "tinyint", unsigned: true, default: null})
  number!: number | null

  /**
   * Title of the chapter.
   */
  @Field({description: "Title of the chapter."})
  @Column()
  title!: string

  /**
   * Chapter description.
   */
  @Field(() => String, {nullable: true, description: "Chapter description."})
  @Column({type: "text", default: null})
  description!: string | null

  /**
   * Chapter text.
   */
  @Field({description: "Chapter text."})
  @Column({type: "mediumtext"})
  text!: string

  /**
   * Indicates if the chapter is hidden from anyone to read.
   */
  @Field({
    description: "Indicates if the chapter is hidden from anyone to read."
  })
  @Column({default: true})
  isDraft!: boolean
}
