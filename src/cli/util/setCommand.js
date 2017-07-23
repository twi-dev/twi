import wrapAction from "./wrapAction"

function setCommand(commander, {command, alias, description, action, option}) {
  commander
    .command(command)
    .description(description)
    .action(wrapAction(action))

  if (alias) {
    commander.alias(alias)
  }

  if (option) {
    commander.option(option)
  }

  return commander
}

export default setCommand
