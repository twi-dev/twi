import server from "core/base"
import getConfig from "core/base/getConfig"

const command = "run"

const description = "run Twi server"

async function run(env) {
  const config = await getConfig(env)

  await server(config)
}

export {
  command,
  description
}

export default run
