import type {Input, Output} from "valibot"
import {object} from "valibot"

import {ImageMetadata} from "../../../lib/types/common/ImageMetadata.js"

import {FileOutput} from "./FileOutput.js"

export const ImageOutput = object({
  ...FileOutput.entries,

  metadata: ImageMetadata
})

export type IImageOutput = Input<typeof ImageOutput>

export type OImageOutput = Output<typeof ImageOutput>
