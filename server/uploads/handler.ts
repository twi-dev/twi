import {defineEventHandler} from "h3"

import {tus} from "./tus"

export default defineEventHandler(async ({node: {
  req, res
}}) => tus.handle(req, res))
