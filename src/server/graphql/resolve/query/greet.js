import {GraphQLString as TString} from "graphql"

const greet = (_, {name}) => `Hello, ${name}!`

export default Query => (
  Query
    .resolve("greet", TString, greet, true)
      .arg("name", TString, true)
    .end()
)
