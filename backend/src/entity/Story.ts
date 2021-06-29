import {ObjectType, Field, Int} from "type-graphql"
import {
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from "typeorm"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

import {User} from "./User"
import {File} from "./File"
import {Tag} from "./Tag"

@ObjectType()
@Entity()
export class Story extends SoftRemovableEntity {
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
  @OneToOne(() => User, {eager: true, onDelete: "SET NULL"})
  @JoinColumn()
  cover?: File

  /**
   * List of the story tags
   */
  @Field(() => [Tag], {nullable: "items"})
  @ManyToMany(() => Tag, {eager: true})
  @JoinTable()
  tags?: Tag[] | null

  /**
   * Story title.
   */
  @Field()
  @Column()
  title!: string

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
  slug!: string

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

  @Field(() => Int)
  @Column({type: "tinyint", unsigned: true, default: 0})
  chaptersCount!: number
}
