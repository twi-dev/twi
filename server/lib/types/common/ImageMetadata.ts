import type {Input, Output} from "valibot"
import {object} from "valibot"

import {ImageSize} from "./ImageSize.js"

export const ImageMetadata = object({
  ...ImageSize.object
})

export type IImageMetadata = Input<typeof ImageMetadata>

export type OImageMetadata = Output<typeof ImageMetadata>
