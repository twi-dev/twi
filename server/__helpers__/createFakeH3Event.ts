import {IncomingMessage, ServerResponse} from "node:http"
import {Socket} from "node:net"

import {H3Event} from "h3"

export interface CreateFakeH3EventParams {
  req?: IncomingMessage
  res?: ServerResponse
  socket?: Socket
}

export function createFakeH3Event(
  params: CreateFakeH3EventParams = {}
): H3Event {
  const {
    socket = new Socket(),
    req = new IncomingMessage(socket),
    res = new ServerResponse(req)
  } = params

  return new H3Event(req, res)
}
