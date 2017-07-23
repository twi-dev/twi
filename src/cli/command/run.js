import server from "core/base"

const command = "run"

const description = "run Twi server"

async function run(env) {
  await server({env})
}

export {
  command,
  description
}

export default run
