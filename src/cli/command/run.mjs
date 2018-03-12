import server from "core/base"
import getConfig from "core/base/getConfig"

const description = "run Twi server"

async function run(env) {
  const config = await getConfig(env)

  await server(config)
}

export default run
export {
  description
}
