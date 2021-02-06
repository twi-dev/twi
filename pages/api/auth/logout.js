import createError from "http-errors"
import nc from "next-connect"

import onError from "server/middleware/errorHandler"
import session from "server/middleware/session"
import client from "server/middleware/client"
import cors from "server/middleware/cors"

/** @type {import("next").PageConfig} */
export const config = {
  api: {
    externalResolver: true
  }
}

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 *
 * @return {Promise<void>}
 */
async function logout(req, res) {
  if (!req.session.user) {
    throw createError(401)
  }

  await req.session.destroy()

  res.status(200).json({success: true, error: null})
}

const handler = nc({onError})
  .use(cors)
  .use(session)
  .use(client)
  .use(logout)

export default handler
