import {Context} from "koa"

export interface BaseContext extends Context {
  requestId: string,
  session: {userId: number} | null
}
