import {GraphQLScalarType} from "graphql"
import {Kind} from "graphql/language"
import {GraphQLError} from "graphql/error"

const STRING = Kind.STRING

const loginRegExpr = /^[a-z0-9-_.]+$/i

function validateLogin(ast) {
  const {kind, value} = ast

  if (kind !== STRING) {
    throw new GraphQLError(
      "Query error: Expected String value for TLogin type, " +
      `but got a type of ${kind}`, [ast]
    )
  }

  if (!loginRegExpr.test(value)) {
    throw new GraphQLError(
      "User login have unnesessary format: Allowed only " +
      "alphabetic characters, numbers and - _ . symbols.", [ast]
    )
  }
}

const parseValue = value => validateLogin({
  kind: STRING, value
})

const parseLiteral = ast => validateLogin({...ast})

const TLogin = new GraphQLScalarType({
  name: "Login",
  description: (
    "The user human-readable unique identifier. Allowed only " +
    "alphabetic characters, numbers and - _ . symbols."
  ),
  serialize: value => value,
  parseValue,
  parseLiteral
})

export default TLogin
