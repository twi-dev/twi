import {ObjectType, Field, ID} from "type-graphql"
import {PrimaryKey} from "@mikro-orm/core"

@ObjectType({isAbstract: true})
export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryKey({unsigned: true})
  id!: number
}
