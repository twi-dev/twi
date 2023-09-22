import {z} from "zod"

import type {MaybeNull} from "../../../../../lib/utils/types/MaybeNull.js"

export interface MetadataInput {
  relativePath?: MaybeNull<string>
  name?: MaybeNull<string>
  type?: MaybeNull<string>
  filetype?: MaybeNull<string>
  filename?: MaybeNull<string>
}

export const Metadata = z.object({
  type: z.string(),
  name: z.string()
})

export type IMetadata = z.input<typeof Metadata>

export type OMetadata = z.output<typeof Metadata>
