import {InputType, Field} from "type-graphql"

@InputType()
class FileInput {
  @Field()
  path!: string

  @Field()
  name!: string

  @Field()
  mime!: string
}

export default FileInput
