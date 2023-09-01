import Uppy from "@uppy/core"
import Tus from "@uppy/tus"

export const uppy = new Uppy({debug: true})
  .use(Tus, {endpoint: "/api/uploads"})
