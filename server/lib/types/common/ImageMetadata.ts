import {z} from "zod"

export const ImageMetadata = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive()
})

export type IImageMetadata = z.input<typeof ImageMetadata>

export type OImageMetadata = z.output<typeof ImageMetadata>
