import passport from "koa-passport"

function addStrategy(Ctor, options, verify) {
  const fulfill = (...args) => {
    const cb = args.pop()

    verify(...args).then(res => cb(null, res)).catch(cb)
  }

  passport.use(new Ctor(options, fulfill))
}

export default addStrategy
