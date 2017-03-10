import {GraphQLString as TString} from "graphql"

const greet = (_, {name}) => `Hello, ${name}!`

export default resolve => (
  resolve(TString, greet, true)
    .arg("name", TString, true)
)
