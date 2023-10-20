import sharp from "sharp"

import {parseAsync} from "valibot"

import {ImageMetadata} from "../types/common/ImageMetadata.js"

export const getImageMetadata = async (
  path: string
) => parseAsync(ImageMetadata, await sharp(path).metadata())
