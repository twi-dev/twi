import {GraphQLString as TString} from "graphql"

const greet = (_, {name}) => `Hello, ${name}!`

export default resolve => (
  resolve(
    TString, greet, true,
    "Just an demonstration resolver that returns \"Hello %username%\" message"
  )
    .arg("name", TString, true)
)
