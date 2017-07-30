import rd from "require-dir"
import isEmpty from "lodash/isEmpty"

import invariant from "@octetstream/invariant"

import setCommand from "./setCommand"

import getEnv from "../helper/getEnv"

function getCommands(path, commander) {
  const commands = rd(path)
  const env = getEnv()

  invariant(
    isEmpty(commands),
    "No commands were defined at %s directory.\n Exit with non-zero code.",
    path
  )

  for (const [name, config] of Object.entries(commands)) {
    setCommand(commander, env, {
      ...config, action: config.default || config[name] || config
    })
  }

  return commander
}

export default getCommands
