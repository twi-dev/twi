import type {PathLike} from "node:fs"

import {isString} from "lodash-es"

export const isPathLike = (
  value: unknown
): value is PathLike => Buffer.isBuffer(value)
  || isString(value)
  || value instanceof URL
