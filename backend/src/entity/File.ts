import {Field, ObjectType, Int} from "type-graphql"
import {Entity, Column} from "typeorm"

import SoftRemovableEntity from "entity/abstract/AbstractSoftRemovableEntity"

@ObjectType()
@Entity()
export class File extends SoftRemovableEntity {
  @Field()
  @Column()
  path!: string

  @Field()
  @Column()
  name!: string

  @Field()
  @Column({type: "char", length: 128})
  hash!: string

  @Field()
  @Column()
  mime!: string

  @Field(() => Int)
  @Column({unsigned: true})
  size!: number
}

export default File
