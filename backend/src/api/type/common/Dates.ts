import {ObjectType, Field} from "type-graphql"

@ObjectType()
class Dates {
  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

export default Dates
