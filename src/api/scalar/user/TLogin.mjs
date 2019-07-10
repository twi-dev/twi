import {GraphQLScalarType as Scalar} from "graphql"
import {GraphQLError} from "graphql/error"
import {Kind} from "graphql/language"

import validate from "db/model/User/util/validateLogin"

const STRING = Kind.STRING

function validateLogin(ast) {
  const {kind, value} = ast

  if (kind !== STRING) {
    throw new GraphQLError(
      "Query error: Expected String value for TLogin type, "
        + `but got a type of ${kind}`,

      [ast]
    )
  }

  if (!validate(value)) {
    throw new GraphQLError(
      "User login have unnesessary format: Allowed only "
        + "alphabetic characters, numbers and - _ . symbols.",

      [ast]
    )
  }

  return value
}

const parseValue = value => validateLogin({
  kind: STRING, value
})

const parseLiteral = ast => validateLogin({...ast})

const TLogin = new Scalar({
  name: "Login",
  description: (
    "The user human-readable unique identifier. Allowed only "
      + "alphabetic characters, numbers and - _ . symbols."
  ),
  serialize: String,
  parseLiteral,
  parseValue
})

export default TLogin
