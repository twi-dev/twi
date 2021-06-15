import {ObjectType, Field} from "type-graphql"
import {format} from "date-fns"
import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BeforeUpdate
} from "typeorm"

import createSlug from "helper/util/createSlug"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import User from "./User"
import File from "./File"

const SLUG_DATE_MASK = "yyyy/MM/dd"

@ObjectType()
@Entity()
export class Story extends SoftRemovableEntity {
  #slug!: string

  #title!: string

  @Column({unsigned: true})
  publisherId!: number

  @Column({unsigned: true, nullable: true})
  coverId?: number

  /**
   * The user who published the story.
   */
  @Field(() => User)
  @ManyToOne(() => User, {onDelete: "CASCADE", eager: true})
  publisher!: User

  /**
   * Story cover.
   */
  @Field(() => File, {nullable: true})
  @OneToOne(() => User, {eager: true})
  @JoinColumn()
  cover?: File

  /**
   * Story title.
   */
  @Field()
  @Column()
  get title(): string {
    return this.#title
  }

  set title(value: string) {
    this.slug = value
    this.#title = value
  }

  /**
   * Story description.
   */
  @Field()
  @Column({type: "text"})
  description!: string

  /**
   * The unique human-readable identifier of the story.
   */
  @Field()
  @Column({unique: true})
  get slug(): string {
    return this.#slug
  }

  set slug(value: string) {
    const formatted = format(this.createdAt, SLUG_DATE_MASK)

    this.#slug = `${formatted}/${createSlug(value)}`
  }

  /**
   * Indicates if the story has been available for everyone to read when value is set to false.
   * Otherwise it will only available for owner and collaborators.
   */
  @Field()
  @Column({default: true})
  isDraft!: boolean

  /**
   * Indicates if the story finished.
   * It must have at least one chapter to be marked as finished.
   */
  @Field()
  @Column({default: false})
  isFinished!: boolean

  @Field()
  @Column({type: "tinyint", unsigned: true, default: 0})
  chaptersCount!: number

  @BeforeUpdate()
  updateIsFinished() {
    if (this.isFinished === true && this.chaptersCount < 1) {
      this.isFinished = false
    }
  }

  @BeforeUpdate()
  updateChaptersCount() {
    if (this.chaptersCount < 0) {
      this.chaptersCount = 0
    }
  }
}

export default Story
