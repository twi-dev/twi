import {GraphQLString as TString} from "graphql"

const greet = (_, {name}) => `Hello, ${name}!`

const resolve = {
  type: TString,
  handler: greet,
  required: true,
  description: (
    "Just an demonstration resolver that returns \"Hello %username%\" message"
  )
}

const name = {
  type: TString,
  required: true
}

const args = {name}

export {resolve, args}
