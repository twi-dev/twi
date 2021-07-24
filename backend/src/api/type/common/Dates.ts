import {ObjectType, Field} from "type-graphql"

@ObjectType()
class Dates {
  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date

  @Field(() => Date, {nullable: true})
  deletedAt!: Date | null
}

export default Dates
