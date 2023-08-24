import {z} from "zod"

export const ChapterBaseOutput = z.object({
  slug: z.string().min(2)
})

export type IChapterBaseOutput = z.input<typeof ChapterBaseOutput>

export type OChapterBaseOutput = z.output<typeof ChapterBaseOutput>
