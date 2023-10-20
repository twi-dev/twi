import {object, type BaseSchema} from "valibot"

import {WithId} from "../WithId.js"

export const createTextType = <TType>(text: BaseSchema<TType>) => object({
  ...WithId.object,

  text
})
