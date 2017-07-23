const wrapAction = action => function runAction(...args) {
  const onErorr = err => process.emit("error", err)

  action(...args).catch(onErorr)
}

export default wrapAction
