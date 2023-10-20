import {string, object, minLength} from "valibot"
import type {Input, Output} from "valibot"

export const CategoryBase = object({
  name: string([minLength(2)])
})

export type ICategoryBase = Input<typeof CategoryBase>

export type OCategoryBase = Output<typeof CategoryBase>
