import {resolve} from "node:path"

import {FileStore} from "@tus/file-store"
import {Server} from "@tus/server"

export const tus = new Server({
  path: "/api/uploads",
  respectForwardedHeaders: true,
  datastore: new FileStore({
    directory: resolve("uploads")
  })
})
