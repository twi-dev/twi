import Uppy from "@uppy/core"
import Tus from "@uppy/tus"

export const uppy = new Uppy({debug: true, restrictions: {maxNumberOfFiles: 1}})
  .use(Tus, {endpoint: "/api/uploads"})
