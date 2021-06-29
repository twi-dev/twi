import {TypeormLoader} from "type-graphql-dataloader"
import {ObjectType, Field} from "type-graphql"
import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from "typeorm"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import {Chapter} from "./Chapter"
import {User} from "./User"
import {File} from "./File"
import {Tag} from "./Tag"

@ObjectType()
@Entity()
export class Story extends SoftRemovableEntity {
  /**
   * The user who published the story.
   */
  @Field(() => User)
  @ManyToOne(() => User, {onDelete: "CASCADE", eager: true, nullable: false})
  publisher!: User

  /**
   * Story cover.
   */
  @Field(() => File, {nullable: true})
  @OneToOne(() => User, {eager: true, onDelete: "SET NULL", nullable: true})
  @JoinColumn()
  cover!: File | null

  /**
   * List of the story tags
   */
  @Field(() => [Tag], {nullable: "items"})
  @ManyToMany(() => Tag, {eager: true})
  @JoinTable()
  tags!: Tag[] | null

  /**
   * List of the chapters associated with the story
   */
  @Field(() => [Chapter], {nullable: "items"})
  @OneToMany(() => Chapter, (chapter) => chapter.story)
  @TypeormLoader()
  chapters!: Chapter[] | null

  /**
   * Story title.
   */
  @Field({description: "Story title."})
  @Column()
  title!: string

  /**
   * Story description.
   */
  @Field({description: "Story description."})
  @Column({type: "text"})
  description!: string

  /**
   * The unique human-readable identifier of the story.
   */
  @Field({description: "The unique human-readable identifier of the story."})
  @Column({unique: true})
  slug!: string

  /**
   * Indicates if the story is hidden from anyone to read.
   */
  @Field({description: "Indicates if the story is hidden from anyone to read."})
  @Column({default: true})
  isDraft!: boolean

  /**
   * Indicates if the story finished.
   * It must have at least one chapter to be marked as finished.
   */
  @Field({
    description: "Indicates if the story is finished. "
      + "It **must** have at least one chapter to be marked as finished."
  })
  @Column({default: false})
  isFinished!: boolean

  @Column({type: "tinyint", unsigned: true, default: 0})
  chaptersCount!: number
}
