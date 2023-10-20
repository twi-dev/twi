import {object, optional} from "valibot"
import type {Input, Output} from "valibot"
import {v4} from "uuid"

import {ID} from "../common/ID.js"

export const WithId = object({
  id: optional(ID, v4)
})

export type IWithId = Input<typeof WithId>

export type OWithId = Output<typeof WithId>
