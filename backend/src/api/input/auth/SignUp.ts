import {IsEmail, Matches} from "class-validator"
import {InputType, Field} from "type-graphql"

import {LOGIN_PATTERN} from "entity/User"

@InputType()
class AuthSignUpInput {
  @Field()
  @IsEmail()
  email!: string

  @Field()
  @Matches(LOGIN_PATTERN)
  login!: string

  @Field()
  password!: string
}

export default AuthSignUpInput
