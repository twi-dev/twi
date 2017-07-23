import rd from "require-dir"
import isEmpty from "lodash/isEmpty"

import invariant from "core/helper/util/invariant"

import setCommand from "./setCommand"

function getCommands(path, commander) {
  const commands = rd(path)

  invariant(
    isEmpty(commands),
    "No commands were defined at %s directory.\n Exit with non-zero code.",
    path
  )

  for (const [name, config] of Object.entries(commands)) {
    setCommand(commander, {
      ...config, action: config.default || config[name] || config
    })
  }

  return commander
}

export default getCommands
