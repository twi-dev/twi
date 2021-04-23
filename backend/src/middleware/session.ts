import {URL} from "url"

import session from "koa-session-minimal"

import store from "koa-redis"
import ms from "ms"

import redis from "auth/storage"

const middleware = session({
  key: "twi.sid",
  store: store({ client: redis }),
  cookie: {
    maxAge: ms("1y"),
    sameSite: "lax",
    domain: new URL(process.env.SERVER_ADDRESS as string).hostname,
    secure: process.env.NODE_ENV === "production",
  },
});

export default middleware
