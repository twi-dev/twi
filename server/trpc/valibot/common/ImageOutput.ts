import type {Input, Output} from "valibot"
import {object} from "valibot"

import {FileOutput} from "./FileOutput.js"
import {ImageSize} from "./ImageSize.js"

export const ImageOutput = object({
  ...FileOutput.object, metadata: ImageSize
})

export type IImageOutput = Input<typeof ImageOutput>

export type OImageOutput = Output<typeof ImageOutput>
