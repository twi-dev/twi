import wrapCommand from "./wrapCommand"

function setCommand(commander, {command, alias, description, action, option}) {
  commander
    .command(command)
    .description(description)
    .action(wrapCommand(action))

  if (alias) {
    commander.alias(alias)
  }

  if (option) {
    commander.option(option)
  }

  return commander
}

export default setCommand
