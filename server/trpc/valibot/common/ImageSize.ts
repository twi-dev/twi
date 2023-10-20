import {number, integer, minValue, object} from "valibot"
import type {Input, Output} from "valibot"

const Edge = number([integer(), minValue(1)])

export const ImageSize = object({
  width: Edge,
  height: Edge
})

export type IImageSize = Input<typeof ImageSize>

export type OImageSize = Output<typeof ImageSize>
