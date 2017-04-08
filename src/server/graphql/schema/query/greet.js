import {GraphQLString as TString} from "graphql"

const resolve = {
  type: TString,
  handler: (_, {name}) => `Hello, ${name}!`
}

const name = {
  type: TString
}

const args = {name}

export {resolve, args}
