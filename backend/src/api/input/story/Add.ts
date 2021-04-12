import {InputType, Field} from "type-graphql"

@InputType()
class StoryAddInput {
  @Field()
  title!: string

  @Field({nullable: true})
  description?: string
}

export default StoryAddInput
