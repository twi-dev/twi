import {defineEventHandler} from "h3"

import {tus} from "./tus"

const xProtoKey = "x-forwarded-proto"

const isXProtoHeaderValid = (value: string) => /^https?/i.test(value)

export default defineEventHandler(async ({node: {req, res}}) => {
  // Remove once this issue is resolved: https://github.com/unjs/nitro/issues/1121
  const {headers} = req
  const xProto = headers[xProtoKey]
  if (xProto && !isXProtoHeaderValid(String(xProto))) {
    delete req.headers[xProtoKey]
  }

  return tus.handle(req, res)
})
