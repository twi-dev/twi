import test from "ava"
import pq from "proxyquire"
import isFunction from "lodash/isFunction"

const ROOT = process.cwd()

const mockAssets = {
  main: {
    js: "magic.js"
  }
}

const assets = pq(`${ROOT}/server/core/helper/util/assets`, {
  "promise-fs": {
    readFile: () => JSON.stringify(mockAssets)
  }
}).default

test("Should be a function", async t => {
  t.plan(1)

  t.true(isFunction(assets))
})

test("Should return a Promise", async t => {
  t.plan(1)

  t.true(assets() instanceof Promise)
})

test("Should resolve a function", async t => {
  t.plan(1)

  t.true(isFunction(await assets()))
})

test("Should return a required assets type", async t => {
  t.plan(1)

  const getAssets = await assets()

  t.deepEqual(getAssets("js"), ["magic.js"])
})

test(
  "Should throw a TypeError when getAssets has been called without type",
  async t => {
    t.plan(1)

    const getAssets = await assets()

    const trap = () => getAssets()

    t.throws(trap, "Asset type cannot be empty.")
  }
)

test("Should throw a TypeError when asset type is not a string", async t => {
  t.plan(1)

  const getAssets = await assets()

  const trap = () => getAssets(451)

  t.throws(trap, "Asset type should be a string.")
})
