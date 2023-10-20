import {number, integer, minValue, object} from "valibot"
import type {Input, Output} from "valibot"

export const ImageSizeSoze = number([integer(), minValue(1)])

export const ImageSize = object({
  width: ImageSizeSoze,
  height: ImageSizeSoze
})

export type IImageSize = Input<typeof ImageSize>

export type OImageSize = Output<typeof ImageSize>
