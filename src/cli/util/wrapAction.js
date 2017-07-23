const wrapAction = (action, env) => function runAction(...args) {
  const onErorr = err => process.emit("error", err)

  action(env, ...args).catch(onErorr)
}

export default wrapAction
