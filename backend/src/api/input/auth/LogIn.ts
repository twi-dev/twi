import {InputType, Field} from "type-graphql"

@InputType()
class AuthLogInInput {
  @Field()
  username!: string

  @Field()
  password!: string
}

export default AuthLogInInput
