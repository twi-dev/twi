import {resolve} from "node:path"

import {FileStore} from "@tus/file-store"
import {Server} from "@tus/server"

export const tus = new Server({
  path: "/api/uploads",
  datastore: new FileStore({
    directory: resolve("public", "uploads")
  })
})
