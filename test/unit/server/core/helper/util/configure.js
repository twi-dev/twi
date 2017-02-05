import test from "ava"

import pq from "proxyquire"
import merge from "lodash/merge"
import isPlainObject from "lodash/isPlainObject"

const SERVER_ROOT = `${process.cwd()}/server`

const defaultConfig = {
  someValue: (
    "A wizard is never late, nor is he early, " +
    "he arrives precisely when he means to."
  )
}

const userConfig = {}

const expectedConfig = merge({}, defaultConfig, userConfig, {
  isDev: true,
  env: "development"
})

function mockReadYamlSync(path) {
  if (path.endsWith("default")) {
    return defaultConfig
  } else if (path.endsWith("user")) {
    return userConfig
  } else {
    throw new Error(`Can't mocking an unexpected path: ${path}`)
  }
}

test.beforeEach(t =>{
  const configure = () => pq(
    `${SERVER_ROOT}/core/helper/util/configure`,
    {
      ["node-yaml"]: {
        readSync: mockReadYamlSync
      }
    }
  )

  t.context = {
    configure
  }
})

test("Should return a plain object", t => {
  t.plan(1)

  t.true(isPlainObject(t.context.configure()))
})

test("Should have valid env values on production", t => {
  t.plan(2)

  const originalEnv = process.env.NODE_ENV || "development"

  process.env.NODE_ENV = "production"

  const config = t.context.configure()

  t.false(config.isDev)
  t.is(config.env, "production")

  process.env.NODE_ENV = originalEnv
})

test("Should be equal with expected config", t => {
  t.plan(1)

  const config = t.context.configure()

  t.deepEqual(config, expectedConfig)
})
