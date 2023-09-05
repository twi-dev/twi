import {resolve} from "node:path"

import {FileStore} from "@tus/file-store"

export const store = new FileStore({
  directory: resolve("uploads")
})
