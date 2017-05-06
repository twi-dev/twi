import {join} from "path"

import test from "ava"

import pq from "proxyquire"
import merge from "lodash/merge"
import isPlainObject from "lodash/isPlainObject"

import getConfig from "system/base/getConfig"

const ROOT = process.cwd()

test("Should be a function", t => {
  t.plan(1)

  t.is(typeof getConfig, "function")
})

test("Should return a Promise", t => {
  t.plan(1)

  const noop = () => ({})

  const getConfig = pq(join(ROOT, "system/base/getConfig"), {
    "node-yaml": {
      read: noop
    }
  })

  t.true(
    getConfig.default("unicorn", {name: "development"}) instanceof Promise
  )
})

test("Should return a plan object", async t => {
  t.plan(1)

  const noop = () => ({})

  const getConfig = pq(join(ROOT, "system/base/getConfig"), {
    "node-yaml": {
      read: noop
    }
  })

  t.true(isPlainObject(
    await getConfig.default("unicorn", {name: "development"}))
  )
})

test("Should return an expected config file", async t => {
  t.plan(1)

  const env = {
    name: "development",
    dev: true,
    test: false,
    debug: false
  }

  const system = {
    name: "My Awesome unicorn App"
  }

  const unicornDefault = {}

  const unicornDevelopment = {}

  const unicorn = merge({}, unicornDefault, unicornDevelopment)

  const expectedConfig = {
    ...unicorn, env, system
  }

  function read(path) {
    if (path.endsWith("system/default.yml")) {
      return system
    }

    if (path.endsWith("unicorn/default.yml")) {
      return unicornDefault
    }

    if (path.endsWith("unicorn/development.yml")) {
      return unicornDevelopment
    }

    return {}
  }

  const getConfig = pq(join(ROOT, "system/base/getConfig"), {
    "node-yaml": {
      read
    }
  })

  const actualConfig = await getConfig.default("unicorn", env)

  t.deepEqual(expectedConfig, actualConfig)
})

test("Should throw a TypeError when called without service name", async t => {
  t.plan(3)

  const err = await t.throws(getConfig())

  t.true(err instanceof TypeError)
  t.is(err.message, "Service name should be a string.")
})

test("Should throw a TypeError when env is not a plain object", async t => {
  t.plan(3)

  const err = await t.throws(getConfig("unicorn"))
  t.true(err instanceof TypeError)
  t.is(err.message, "Env should be passed as object.")
})

test("Should throw an Error when production config is not exists", async t => {
  t.plan(2)

  function read(path) {
    if (path.endsWith("unicorn/production.yml")) {
      const err = Error("No such file or directory")
      err.code = "ENOENT"

      throw err
    }

    return {}
  }

  const getConfig = pq(join(ROOT, "system/base/getConfig"), {
    "node-yaml": {
      read
    }
  })

  // TODO: Add an assertion and specific error class for this case
  const err = await t.throws(getConfig.default("unicorn", {name: "production"}))

  const dir = join(ROOT, "config/service/unicorn")

  t.is(
    err.message,
    "Production config required." +
    `Is production.yml exists in "${dir}" directory?`
  )
})

test("Should throw an error when code is not ENOENT", async t => {
  t.plan(2)

  function read() {
    throw new Error("N-nope.")
  }

  const getConfig = pq(join(ROOT, "system/base/getConfig"), {
    "node-yaml": {
      read
    }
  })

  // TODO: Add an assertion and specific error class for this case
  const err = await t.throws(getConfig.default("unicorn", {name: "production"}))

  t.is(err.message, "N-nope.")
})
