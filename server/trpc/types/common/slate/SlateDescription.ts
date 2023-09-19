import {z} from "zod"

import {Paragraph} from "./Paragraph.js"

export const SlateDescription = z.array(Paragraph).nonempty()

export type ISlateDescription = z.input<typeof SlateDescription>

export type OSlateDescription = z.output<typeof SlateDescription>
