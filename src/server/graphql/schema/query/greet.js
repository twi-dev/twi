import {GraphQLString as TString} from "graphql"
import {toRequired} from "parasprite"

const greet = (_, {name}) => `Hello, ${name}!`

const setResover = resolve => (
  resolve(
    toRequired(TString, true), // Needs to fix that thing in parasprite API
    "Just an demonstration resolver that returns \"Hello %username%\" message",
    greet
  )
    .arg("name", TString, true)
)

export default setResover
