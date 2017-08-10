import {GraphQLID as TID} from "graphql"

import Interface from "parasprite/Interface"

class Node {
  constructor(id) {
    this.id = id
  }
}

const isTypeOf = val => val instanceof Node

const INode = Interface("Node", "An object with an ID.")
  .field("id", TID, true)
.end()

export default INode

export {
  Node,
  isTypeOf
}
