import {InputType, Field} from "type-graphql"

@InputType()
class ChapterAddInput {
  @Field()
  title!: string

  @Field(() => String, {nullable: true})
  description?: string | null

  @Field()
  text!: string

  @Field({defaultValue: true})
  isDraft?: boolean
}

export default ChapterAddInput
