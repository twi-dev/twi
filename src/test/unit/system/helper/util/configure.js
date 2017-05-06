import test from "ava"

import pq from "proxyquire"
import merge from "lodash/merge"
import isPlainObject from "lodash/isPlainObject"

const SYSTEM_ROOT = `${process.cwd()}/system`

const defaultConfig = {
  someValue: (
    "A wizard is never late, nor is he early, " +
    "he arrives precisely when he means to."
  )
}

const userConfig = {}

const expectedConfig = merge({}, defaultConfig, userConfig, {
  isDev: true,
  env: "development",
  debug: false,
  test: false
})

function mockReadYamlSync(path) {
  if (path.endsWith("default")) {
    return defaultConfig
  } else if (path.endsWith("user")) {
    return userConfig
  }

  throw new Error(`Can't mocking an unexpected path: ${path}`)
}

test.beforeEach(t => {
  const configure = () => pq(
    `${SYSTEM_ROOT}/helper/util/configure`,
    {
      "node-yaml": {
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

  process.env.NODE_ENV = "production"

  const config = t.context.configure()

  t.false(config.isDev)
  t.is(config.env, "production")

  delete process.env.NODE_ENV
})

test("Should be equal with expected config", t => {
  t.plan(1)

  const config = t.context.configure()

  t.deepEqual(config, expectedConfig)
})
