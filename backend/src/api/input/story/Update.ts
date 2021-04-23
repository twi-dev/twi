import {InputType, Field, ID} from "type-graphql"

@InputType()
class StoryUpdateInput {
  @Field(() => ID)
  id!: number

  @Field({nullable: true})
  title?: string

  @Field({nullable: true})
  description?: string

  @Field({nullable: true})
  isDraft?: boolean

  @Field({nullable: true})
  isFinished?: boolean
}

export default StoryUpdateInput
