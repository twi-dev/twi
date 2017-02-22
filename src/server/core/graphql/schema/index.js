import proxy from "server/core/helper/decorator/proxy"
import apply from "server/core/helper/proxy/selfInvokingClass"

@proxy({apply})
class ParaspriteSchema {
  constructor() {
    this._query = {}
    this._mutation = {}
    this._subscribtion = {}
  }

  query(name) {}

  mutation(name) {}

  // subscribtion(name) {}
}

export default ParaspriteSchema
