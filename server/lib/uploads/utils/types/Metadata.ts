import type {Input, Output} from "valibot"
import {object, string} from "valibot"

import type {MaybeNull} from "../../../../../lib/utils/types/MaybeNull.js"

export interface MetadataInput {
  relativePath?: MaybeNull<string>
  name?: MaybeNull<string>
  type?: MaybeNull<string>
  filetype?: MaybeNull<string>
  filename?: MaybeNull<string>
}

export const Metadata = object({
  type: string(),
  name: string()
})

export type IMetadata = Input<typeof Metadata>

export type OMetadata = Output<typeof Metadata>
