import {z} from "zod"

import {PlainText} from "./PlainText.js"

export const EmptyText = PlainText.extend({
  text: z.literal("")
})

export type IEmptyText = z.input<typeof EmptyText>

export type OEmptyText = z.output<typeof EmptyText>
