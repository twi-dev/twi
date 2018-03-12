import invariant from "@octetstream/invariant"
import isFunction from "lodash/isFunction"

import wrapAction from "./wrapAction"

function setCommand(
  commander, env, command, {alias, description, action, option} = {}
) {
  invariant(
    !isFunction(action), TypeError,
    "Command action should be a function."
  )

  commander
    .command(command)
    .description(description)
    .action(wrapAction(action, env))

  if (alias) {
    commander.alias(alias)
  }

  if (option) {
    commander.option(option)
  }

  return commander
}

export default setCommand
