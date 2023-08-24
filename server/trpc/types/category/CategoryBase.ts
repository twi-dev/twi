import {z} from "zod"

export const CategoryBase = z.object({
  name: z.string().min(2)
})

export type ICategoryBase = z.input<typeof CategoryBase>

export type OCategoryBase = z.output<typeof CategoryBase>
