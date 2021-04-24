import {InputType, Field} from "type-graphql"

@InputType()
class ChapterAddInput {
  @Field()
  title!: string

  @Field({nullable: true})
  description?: string

  @Field()
  text!: string

  @Field({defaultValue: true})
  isDraft?: boolean
}

export default ChapterAddInput
