import {z} from "zod"

import {ImageMetadata} from "../../../lib/types/common/ImageMetadata.js"

import {FileOutput} from "./FileOutput.js"

export const ImageOutput = FileOutput.extend({
  metadata: ImageMetadata
})

export type IImageOutput = z.input<typeof ImageOutput>

export type OImageOutput = z.output<typeof ImageOutput>
