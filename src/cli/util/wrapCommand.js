const wrapCommand = command => function runCommand(...args) {
  const onErorr = err => process.emit("error", err)

  command(...args).catch(onErorr)
}

export default wrapCommand
