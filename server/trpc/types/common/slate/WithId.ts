import {v4} from "uuid"
import {z} from "zod"

import {ID} from "../ID.js"

export const WithId = z.object({
  id: ID.optional().transform(value => value ?? v4())
})

export type IWithId = z.input<typeof WithId>

export type OWithId = z.output<typeof WithId>
