import test from "ava"

// import req from "supertest"

import Server from "system/base/Server"

test("Should create a Server instance with given name", t => {
  t.plan(3)

  const server = new Server("noop", {port: 1055})

  t.true(server instanceof Server)
  t.is(server.name, "noop")
  t.is(server.port, 1055)
})

test("Should also create a Server from config", t => {
  t.plan(3)

  const server = new Server({
    name: "nibbler",
    port: 1177
  })

  t.true(server instanceof Server)
  t.is(server.name, "nibbler")
  t.is(server.port, 1177)
})

test("Should return a local address in dev mode", t => {
  t.plan(1)

  const port = 1337
  const dev = true

  const server = new Server("noop", {port, dev})

  t.is(server.addr, `http://localhost:${port}`)
})

test("Should extend server context with given method", t => {
  t.plan(3)

  const name = "ext"
  const ext = () => {}

  const server = new Server("noop", {
    port: 3000
  })

  server.ext(name, ext)

  t.true(name in server.context)

  const actualExt = server.context[name]
  t.is(typeof actualExt, "function")
  t.is(actualExt, ext)
})

test(
  "Should extend server context from given object as name => ext pair",
  t => {
    t.plan(3)

    const name = "ext"
    const ext = () => {}

    const server = new Server("noop", {
      port: 3000
    })

    server.ext({[name]: ext})

    t.true(name in server.context)

    const actualExt = server.context[name]
    t.is(typeof actualExt, "function")
    t.is(actualExt, ext)
  }
)

test("Should add a middleware to queue", t => {
  t.plan(1)

  const server = new Server("noop", {
    port: 3000
  })

  const noop = async () => {}

  server.use(noop)

  t.deepEqual(server.middleware, [noop])
})

test("Should add middlewares from an array", t => {
  t.plan(1)

  const server = new Server("noop", {
    port: 3000
  })

  const foo = async () => {}
  const bar = async () => {}

  server.use([foo, bar])

  t.deepEqual(server.middleware, [foo, bar])
})

test(
  "Should throw a TypeError when given middleware is not a function or " +
  "not a list of functions",
  t => {
    t.plan(6)

    const server = new Server("noop", {
      port: 3000
    })

    const trap = val => () => server.use(val)

    const errOnPassedValue = t.throws(trap(null))

    t.true(errOnPassedValue instanceof TypeError)
    t.is(
      errOnPassedValue.message,
      "Middlewares argument should be a function or " +
      "an array of the functions."
    )

    const errOnPassedList = t.throws(trap(["string"]))

    t.true(errOnPassedList instanceof TypeError)
    t.is(
      errOnPassedList.message,
      "Middlewares argument should be a function or " +
      "an array of the functions."
    )
  }
)

test("Should throw a TypeError when name has not given", t => {
  t.plan(3)

  const trap = () => new Server()

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(
    err.message,
    "The name is required for the Server instance. " +
    "Note: If you've passed config as first argument, " +
    "than you can set this argument as \"name\" property."
  )
})

test("Should throw a TypeError when given name is not a string", t => {
  t.plan(3)

  const trap = () => new Server(() => {})

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Server name should be a string.")
})

test("Shluld throw an error when port is has no given", t => {
  t.plan(3)

  const trap = () => new Server("noop")

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Port required for noop server.")
})
