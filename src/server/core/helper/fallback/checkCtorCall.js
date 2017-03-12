/**
 * Emulate runtime behaviour on illegal class constructor invocation.
 *
 * @param any ctx – current ctor "this" context
 * @param Function Ctor – class to check
 */
function checkCtorCall(Ctor, ctx) {
  const name = Ctor.constructor.name || Ctor.name

  if (!(ctx instanceof Ctor)) {
    throw new TypeError(
      `Class constructor ${name} cannot be invoked without 'new'`
    )
  }
}

export default checkCtorCall
