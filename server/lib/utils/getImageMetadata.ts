import sharp from "sharp"

import {ImageMetadata} from "../types/common/ImageMetadata.js"

export const getImageMetadata = async (
  path: string
) => ImageMetadata.parseAsync(await sharp(path).metadata())
