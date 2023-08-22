import {type Input, type Output, object} from "valibot"

import {ID} from "./ID.js"

export const Node = object(
  {
    id: ID
  }
)

export type INode = Input<typeof Node>

export type ONode = Output<typeof Node>
