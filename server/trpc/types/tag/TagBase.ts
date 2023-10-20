import {object, string, minLength} from "valibot"
import type {Input, Output} from "valibot"

export const TagBase = object({
  name: string([minLength(2)])
})

export type ITagBase = Input<typeof TagBase>

export type OTagBase = Output<typeof TagBase>
