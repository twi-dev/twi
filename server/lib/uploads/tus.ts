import {Server} from "@tus/server"

import {createFilename} from "./utils/createFilename.js"

import {store} from "./store.js"

export const tus = new Server({
  path: "/api/uploads",
  respectForwardedHeaders: true,
  namingFunction: createFilename,
  datastore: store
})
