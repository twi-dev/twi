import {InputType, Field} from "type-graphql"

@InputType()
class StoryAddInput {
  @Field()
  title!: string

  @Field({nullable: true})
  description!: string

  @Field(() => [String], {
    nullable: true,
    description: "Names of the tags to add to the story."
  })
  tags?: string[] | null
}

export default StoryAddInput
