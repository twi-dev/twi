import server from "core/base"
import config from "core/config"

const description = "run Twi server"

// FIXME: Config passing is deprecated.
// FIXME: Remove all references from the application.
const run = () => server(config)

export default run
export {
  description
}
